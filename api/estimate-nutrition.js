/**
 * Serverless Backend Endpoint: /api/estimate-nutrition
 * Securely calls Google Gemini API to estimate food nutrition.
 * Compatible with Vercel Serverless Functions, Node HTTP, and Vite dev middleware.
 */

const GEMINI_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-2.5-flash',
];

/**
 * Builds the standardized Gemini prompt for food nutrition estimation.
 */
export function buildNutritionPrompt({ foodName, quantity, unit, preparation = '' }) {
  const prepLine = preparation && preparation.trim()
    ? `Preparation method: ${preparation.trim()}`
    : 'Preparation method: Standard / not specified';

  return `Estimate the nutritional values for the following food item and quantity.

Food: ${foodName}
Quantity: ${quantity}
Unit: ${unit}
${prepLine}

Return only valid JSON with the following fields:

{
  "foodName": "string",
  "quantity": 200,
  "unit": "g",
  "calories": 260,
  "protein": 5.4,
  "carbs": 56,
  "fat": 0.6,
  "fiber": 0.8,
  "assumptions": ["Brief explanation of any important assumptions"]
}

Estimate the nutrition for the specified quantity, not a default serving. Use reasonable estimates based on the food and preparation method. If the food description or quantity is ambiguous, make the uncertainty clear or ask for clarification. Do not claim the estimates are exact.`;
}

/**
 * Validates the raw JSON response returned by Gemini according to strict rules.
 */
export function validateGeminiNutritionResponse(parsed, requestedInput) {
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Gemini returned an invalid response structure.');
  }

  const { calories, protein, carbs, fat, fiber, assumptions, foodName } = parsed;

  const parseMacro = (val) => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const match = val.replace(/,/g, '').match(/-?\d+(\.\d+)?/);
      return match ? parseFloat(match[0]) : NaN;
    }
    return NaN;
  };

  const numCals = parseMacro(calories);
  if (!Number.isFinite(numCals) || numCals < 0) {
    throw new Error('Invalid or missing calories value in Gemini response.');
  }

  const numProtein = parseMacro(protein);
  if (!Number.isFinite(numProtein) || numProtein < 0) {
    throw new Error('Invalid or missing protein value in Gemini response.');
  }

  const numCarbs = parseMacro(carbs);
  if (!Number.isFinite(numCarbs) || numCarbs < 0) {
    throw new Error('Invalid or missing carbohydrates value in Gemini response.');
  }

  const numFat = parseMacro(fat);
  if (!Number.isFinite(numFat) || numFat < 0) {
    throw new Error('Invalid or missing fat value in Gemini response.');
  }

  let validatedFiber = 0;
  if (fiber != null) {
    const numFiber = parseMacro(fiber);
    if (!Number.isFinite(numFiber) || numFiber < 0) {
      throw new Error('Invalid fiber value in Gemini response.');
    }
    validatedFiber = Number(numFiber.toFixed(1));
  }

  // Assumptions list
  let validatedAssumptions = [];
  if (Array.isArray(assumptions)) {
    validatedAssumptions = assumptions.filter((a) => typeof a === 'string' && a.trim().length > 0);
  } else if (typeof assumptions === 'string' && assumptions.trim()) {
    validatedAssumptions = [assumptions.trim()];
  }

  return {
    foodName: typeof foodName === 'string' && foodName.trim() ? foodName.trim() : requestedInput.foodName,
    quantity: Number(requestedInput.quantity),
    unit: String(requestedInput.unit),
    calories: Math.round(numCals),
    protein: Number(numProtein.toFixed(1)),
    carbs: Number(numCarbs.toFixed(1)),
    fat: Number(numFat.toFixed(1)),
    fats: Number(numFat.toFixed(1)), // Aliased for RepFuel compatibility
    fiber: validatedFiber,
    assumptions: validatedAssumptions,
    preparation: requestedInput.preparation ? String(requestedInput.preparation).trim() : '',
  };
}

/**
 * Core estimation function that queries the Google Gemini REST API.
 */
export async function executeGeminiNutritionEstimate({ foodName, quantity, unit, preparation = '', apiKey }) {
  if (!apiKey || typeof apiKey !== 'string' || !apiKey.trim()) {
    throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in your environment variables.');
  }

  const cleanApiKey = apiKey.trim();
  const prompt = buildNutritionPrompt({ foodName, quantity, unit, preparation });

  let lastError = null;

  // Try candidate models with fallback
  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanApiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const status = response.status;
        const msg = errorData.error?.message || response.statusText;

        if (status === 404 || status === 503) {
          // Model unavailable or high demand, try next candidate model
          lastError = new Error(`Model ${model} unavailable (${status}): ${msg}`);
          continue;
        }

        if (status === 429) {
          throw new Error('Gemini API rate limit or quota exceeded. Please wait a moment and try again.');
        }

        if (status === 400 || status === 403) {
          throw new Error(`Gemini API authorization error (${status}): ${msg}`);
        }

        throw new Error(`Gemini API error (${status}): ${msg}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error('No content returned from Gemini.');
      }

      // Clean markdown code blocks if returned
      const cleanJson = rawText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      let parsed;
      try {
        parsed = JSON.parse(cleanJson);
      } catch (parseErr) {
        throw new Error(`Failed to parse Gemini response as JSON: ${parseErr.message}`);
      }

      return validateGeminiNutritionResponse(parsed, { foodName, quantity, unit, preparation });
    } catch (err) {
      lastError = err;
      // If it is a fatal auth or rate limit error, do not retry other models
      if (err.message.includes('authorization error') || err.message.includes('quota exceeded')) {
        throw err;
      }
    }
  }

  throw lastError || new Error('All Gemini model endpoints failed.');
}

/**
 * Standard Vercel Serverless Function Handler
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed. Only POST is supported.' });
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const { foodName, quantity, unit, preparation } = body || {};

    if (!foodName || typeof foodName !== 'string' || !foodName.trim()) {
      res.status(400).json({ success: false, error: 'Food name is required.' });
      return;
    }

    const parsedQty = Number(quantity);
    if (!Number.isFinite(parsedQty) || parsedQty <= 0) {
      res.status(400).json({ success: false, error: 'Quantity must be a positive number.' });
      return;
    }

    if (!unit || typeof unit !== 'string' || !unit.trim()) {
      res.status(400).json({ success: false, error: 'Unit is required (e.g., g, ml, piece, bowl).' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      res.status(503).json({
        success: false,
        error: 'GEMINI_API_KEY is not configured on the server. Please set GEMINI_API_KEY in your environment variables.',
      });
      return;
    }

    const data = await executeGeminiNutritionEstimate({
      foodName: foodName.trim(),
      quantity: parsedQty,
      unit: unit.trim(),
      preparation: preparation ? String(preparation).trim() : '',
      apiKey,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || 'Internal server error while estimating nutrition.' });
  }
}
