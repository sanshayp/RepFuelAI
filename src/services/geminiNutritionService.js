/**
 * Gemini Nutrition Estimation Service
 * RepFuelAI
 *
 * Calls the secure backend endpoint /api/estimate-nutrition to estimate
 * calories and macronutrients dynamically using Google Gemini.
 */

import { buildNutritionPrompt, validateGeminiNutritionResponse } from '../../api/estimate-nutrition.js';

/**
 * Validates user input before sending to the API.
 */
export function validateNutritionInput({ foodName, quantity, unit }) {
  const errors = [];

  if (!foodName || typeof foodName !== 'string' || !foodName.trim()) {
    errors.push('Please enter a food name.');
  }

  const parsedQty = Number(quantity);
  if (!Number.isFinite(parsedQty) || parsedQty <= 0) {
    errors.push('Quantity must be a positive number greater than 0.');
  }

  if (!unit || typeof unit !== 'string' || !unit.trim()) {
    errors.push('Please select a measurement unit.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Fallback direct client call (only used if /api/ is unavailable and client key exists).
 */
async function callGeminiDirectClient({ foodName, quantity, unit, preparation, apiKey }) {
  const models = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest', 'gemini-2.5-flash'];
  const prompt = buildNutritionPrompt({ foodName, quantity, unit, preparation });

  let lastErr = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        const status = response.status;
        const msg = errJson.error?.message || response.statusText;

        if (status === 404) {
          lastErr = new Error(`Model ${model} not available: ${msg}`);
          continue;
        }
        if (status === 429) {
          throw new Error('Gemini API quota or rate limit exceeded. Please wait a moment and try again.');
        }
        throw new Error(`Gemini API error (${status}): ${msg}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('No content returned from Gemini.');

      const cleanJson = rawText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      const parsed = JSON.parse(cleanJson);
      return validateGeminiNutritionResponse(parsed, { foodName, quantity, unit, preparation });
    } catch (e) {
      lastErr = e;
      if (e.message.includes('quota') || e.message.includes('authorization')) throw e;
    }
  }

  throw lastErr || new Error('All Gemini model endpoints failed.');
}

/**
 * Estimates nutritional values for a given food item and quantity.
 *
 * @param {{ foodName: string, quantity: number, unit: string, preparation?: string }} params
 * @returns {Promise<{
 *   foodName: string,
 *   quantity: number,
 *   unit: string,
 *   calories: number,
 *   protein: number,
 *   carbs: number,
 *   fat: number,
 *   fats: number,
 *   fiber: number,
 *   assumptions: string[],
 *   preparation: string
 * }>}
 */
export async function estimateFoodNutrition({ foodName, quantity, unit, preparation = '' }) {
  // 1. Client-side input validation
  const validation = validateNutritionInput({ foodName, quantity, unit });
  if (!validation.isValid) {
    throw new Error(validation.errors.join(' '));
  }

  const payload = {
    foodName: foodName.trim(),
    quantity: Number(quantity),
    unit: unit.trim(),
    preparation: preparation ? preparation.trim() : '',
  };

  // 2. Call backend /api/estimate-nutrition endpoint
  let response;
  let networkFailed = false;

  try {
    response = await fetch('/api/estimate-nutrition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    networkFailed = true;
  }

  // If backend endpoint responded
  if (!networkFailed && response) {
    let result;
    try {
      result = await response.json();
    } catch (parseErr) {
      throw new Error('Received an unparseable response from the nutrition server.');
    }

    if (!response.ok || !result.success) {
      const errMsg = result?.error || `Server responded with status ${response.status}.`;
      throw new Error(errMsg);
    }

    // Secondary client-side validation of returned data
    return validateGeminiNutritionResponse(result.data, payload);
  }

  // 3. Fallback direct client call if in local dev with client-side key
  const clientKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (clientKey) {
    return await callGeminiDirectClient({
      ...payload,
      apiKey: clientKey,
    });
  }

  throw new Error('Network error: Unable to reach the nutrition estimation service. Please check your connection.');
}
