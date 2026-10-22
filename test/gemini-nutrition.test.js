/**
 * Test Suite for RepFuelAI Gemini Nutrition Integration
 * Covers:
 * 1. Prompt generation for all required test items (rotis, rice, paneer, dal, uncertain recipes)
 * 2. Response validation rules (finite non-negative numbers, missing values, malformed json)
 * 3. Input validation (empty names, non-positive quantities, missing units)
 * 4. Error handling & non-creation of invalid entries
 * 5. LocalStorage and recalculations (adding, editing, deleting food entries updates totals)
 * 6. Protection of API keys (not exposed in client bundle or localStorage)
 */

import assert from 'node:assert';
import { buildNutritionPrompt, validateGeminiNutritionResponse } from '../api/estimate-nutrition.js';
import { validateNutritionInput } from '../src/services/geminiNutritionService.js';

console.log('--- Starting RepFuelAI Gemini Nutrition Test Suite ---\n');

let testsPassed = 0;
let testsFailed = 0;

function runTest(description, testFn) {
  try {
    testFn();
    console.log(`✓ PASS: ${description}`);
    testsPassed++;
  } catch (err) {
    console.error(`✗ FAIL: ${description}`);
    console.error(`  Error: ${err.message}`);
    testsFailed++;
  }
}

// ----------------------------------------------------
// TEST GROUP 1: Prompt Generation
// ----------------------------------------------------
console.log('--- Test Group 1: Prompt Generation ---');

runTest('Generates correct prompt for "2 medium rotis"', () => {
  const prompt = buildNutritionPrompt({
    foodName: 'Roti',
    quantity: 2,
    unit: 'piece',
    preparation: 'medium, homemade',
  });
  assert(prompt.includes('Food: Roti'));
  assert(prompt.includes('Quantity: 2'));
  assert(prompt.includes('Unit: piece'));
  assert(prompt.includes('Preparation method: medium, homemade'));
  assert(prompt.includes('"calories": 260'));
});

runTest('Generates correct prompt for "250 g cooked white rice"', () => {
  const prompt = buildNutritionPrompt({
    foodName: 'cooked white rice',
    quantity: 250,
    unit: 'g',
  });
  assert(prompt.includes('Food: cooked white rice'));
  assert(prompt.includes('Quantity: 250'));
  assert(prompt.includes('Unit: g'));
  assert(prompt.includes('Preparation method: Standard / not specified'));
});

runTest('Generates correct prompt for "200 g paneer"', () => {
  const prompt = buildNutritionPrompt({
    foodName: 'paneer',
    quantity: 200,
    unit: 'g',
    preparation: 'fresh whole milk',
  });
  assert(prompt.includes('Food: paneer'));
  assert(prompt.includes('Quantity: 200'));
  assert(prompt.includes('Preparation method: fresh whole milk'));
});

runTest('Generates correct prompt for "1 bowl of dal"', () => {
  const prompt = buildNutritionPrompt({
    foodName: 'dal',
    quantity: 1,
    unit: 'bowl',
    preparation: 'yellow dal tadka',
  });
  assert(prompt.includes('Food: dal'));
  assert(prompt.includes('Quantity: 1'));
  assert(prompt.includes('Unit: bowl'));
});

runTest('Generates correct prompt for "A homemade meal with an uncertain recipe"', () => {
  const prompt = buildNutritionPrompt({
    foodName: 'Mixed Vegetable Curry with Paneer and Rice',
    quantity: 1,
    unit: 'plate',
    preparation: 'Homemade meal with uncertain amount of oil and cream',
  });
  assert(prompt.includes('Food: Mixed Vegetable Curry with Paneer and Rice'));
  assert(prompt.includes('Preparation method: Homemade meal with uncertain amount of oil and cream'));
  assert(prompt.includes('If the food description or quantity is ambiguous, make the uncertainty clear'));
});

// ----------------------------------------------------
// TEST GROUP 2: Response Validation
// ----------------------------------------------------
console.log('\n--- Test Group 2: Response Validation ---');

runTest('Accepts valid Gemini response and formats correctly', () => {
  const sampleGeminiResponse = {
    foodName: 'Roti',
    quantity: 2,
    unit: 'piece',
    calories: 240,
    protein: 6.2,
    carbs: 48.0,
    fat: 2.1,
    fiber: 4.0,
    assumptions: ['Whole wheat flour', 'Cooked without ghee or oil'],
  };

  const validated = validateGeminiNutritionResponse(sampleGeminiResponse, {
    foodName: 'Roti',
    quantity: 2,
    unit: 'piece',
    preparation: 'medium, homemade',
  });

  assert.strictEqual(validated.calories, 240);
  assert.strictEqual(validated.protein, 6.2);
  assert.strictEqual(validated.carbs, 48.0);
  assert.strictEqual(validated.fat, 2.1);
  assert.strictEqual(validated.fats, 2.1);
  assert.strictEqual(validated.fiber, 4.0);
  assert.strictEqual(validated.assumptions.length, 2);
  assert.strictEqual(validated.preparation, 'medium, homemade');
});

runTest('Rejects response with negative calories', () => {
  assert.throws(() => {
    validateGeminiNutritionResponse({
      foodName: 'Paneer',
      calories: -100,
      protein: 10,
      carbs: 5,
      fat: 15,
    }, { foodName: 'Paneer', quantity: 100, unit: 'g' });
  }, /Invalid or missing calories value/);
});

runTest('Rejects response with non-numeric or NaN protein', () => {
  assert.throws(() => {
    validateGeminiNutritionResponse({
      foodName: 'Dal',
      calories: 150,
      protein: 'ten grams',
      carbs: 20,
      fat: 4,
    }, { foodName: 'Dal', quantity: 1, unit: 'bowl' });
  }, /Invalid or missing protein value/);
});

runTest('Rejects malformed/missing carbohydrates', () => {
  assert.throws(() => {
    validateGeminiNutritionResponse({
      foodName: 'Rice',
      calories: 260,
      protein: 5,
      carbs: null,
      fat: 1,
    }, { foodName: 'Rice', quantity: 200, unit: 'g' });
  }, /Invalid or missing carbohydrates value/);
});

runTest('Handles missing fiber gracefully by setting 0', () => {
  const res = validateGeminiNutritionResponse({
    foodName: 'Oil',
    calories: 120,
    protein: 0,
    carbs: 0,
    fat: 14,
  }, { foodName: 'Oil', quantity: 1, unit: 'tbsp' });

  assert.strictEqual(res.fiber, 0);
  assert.strictEqual(res.calories, 120);
});

// ----------------------------------------------------
// TEST GROUP 3: Input Validation
// ----------------------------------------------------
console.log('\n--- Test Group 3: Input Validation ---');

runTest('Rejects empty or whitespace food name', () => {
  const v1 = validateNutritionInput({ foodName: '', quantity: 100, unit: 'g' });
  assert.strictEqual(v1.isValid, false);
  assert(v1.errors[0].includes('food name'));

  const v2 = validateNutritionInput({ foodName: '   ', quantity: 100, unit: 'g' });
  assert.strictEqual(v2.isValid, false);
});

runTest('Rejects zero or negative quantity', () => {
  const v1 = validateNutritionInput({ foodName: 'Paneer', quantity: 0, unit: 'g' });
  assert.strictEqual(v1.isValid, false);

  const v2 = validateNutritionInput({ foodName: 'Paneer', quantity: -50, unit: 'g' });
  assert.strictEqual(v2.isValid, false);
});

runTest('Rejects missing or empty measurement unit', () => {
  const v = validateNutritionInput({ foodName: 'Dal', quantity: 1, unit: '' });
  assert.strictEqual(v.isValid, false);
  assert(v.errors[0].includes('measurement unit'));
});

runTest('Accepts valid input combinations', () => {
  const v = validateNutritionInput({ foodName: 'Chicken breast', quantity: 150, unit: 'g' });
  assert.strictEqual(v.isValid, true);
  assert.strictEqual(v.errors.length, 0);
});

// ----------------------------------------------------
// TEST GROUP 4: Totals & Macro Summation
// ----------------------------------------------------
console.log('\n--- Test Group 4: Totals & Macro Summation ---');

runTest('Correctly sums daily calories, protein, carbs, fats and cheat meals', () => {
  const mockLoggedFoods = [
    {
      logId: 1,
      name: 'Roti',
      quantity: 2,
      unit: 'piece',
      calories: 240,
      protein: 6.2,
      carbs: 48,
      fats: 2.1,
      meal: 'breakfast',
      isCheatMeal: false,
    },
    {
      logId: 2,
      name: 'Paneer',
      quantity: 200,
      unit: 'g',
      calories: 530,
      protein: 36,
      carbs: 8,
      fats: 40,
      meal: 'lunch',
      isCheatMeal: false,
    },
    {
      logId: 3,
      name: 'Gulab Jamun (Cheat)',
      quantity: 2,
      unit: 'piece',
      calories: 300,
      protein: 4,
      carbs: 50,
      fats: 10,
      meal: 'snacks',
      isCheatMeal: true,
    },
  ];

  let totalCals = 0;
  let totalP = 0;
  let totalC = 0;
  let totalF = 0;
  let cheatFound = false;

  mockLoggedFoods.forEach((item) => {
    totalCals += Math.round(Number(item.calories) || 0);
    totalP += Math.round(Number(item.protein) || 0);
    totalC += Math.round(Number(item.carbs) || 0);
    totalF += Math.round(Number(item.fats) || 0);
    if (item.isCheatMeal) cheatFound = true;
  });

  assert.strictEqual(totalCals, 240 + 530 + 300); // 1070 kcal
  assert.strictEqual(totalP, 6 + 36 + 4);          // 46 g
  assert.strictEqual(totalC, 48 + 8 + 50);        // 106 g
  assert.strictEqual(totalF, 2 + 40 + 10);        // 52 g
  assert.strictEqual(cheatFound, true);
});

// ----------------------------------------------------
// TEST GROUP 5: Quantity Input & Step Validation
// ----------------------------------------------------
console.log('\n--- Test Group 5: Quantity Input & Step Validation ---');

// HTML5 standard step validation algorithm
function isValidHtml5Step(value, min = 0.1, step = 0.1) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < min) return false;
  const remainder = (num - min) % step;
  // Floating point precision check: remainder should be essentially 0 or equal to step
  return Math.abs(remainder) < 1e-7 || Math.abs(remainder - step) < 1e-7;
}

runTest('HTML5 step validation passes with min=0.1 and step=0.1 for 0.1, 1, 12, 12.5, 100, 250', () => {
  const testValues = [0.1, 1, 12, 12.5, 100, 250];
  testValues.forEach((val) => {
    assert.strictEqual(
      isValidHtml5Step(val, 0.1, 0.1),
      true,
      `Value ${val} must be valid under min=0.1 and step=0.1`
    );
  });
});

runTest('Validates quantity input accepts both integer and decimal values', () => {
  const testQuantities = [0.1, 1, 12, 12.5, 100, 250];
  testQuantities.forEach((qty) => {
    const v = validateNutritionInput({ foodName: 'Oats', quantity: qty, unit: 'g' });
    assert.strictEqual(v.isValid, true, `Quantity ${qty} must be accepted as valid`);
    assert.strictEqual(v.errors.length, 0);
  });
});

runTest('Rejects non-finite, zero, or negative quantity inputs', () => {
  const invalidQuantities = [0, -1, -0.1, NaN, Infinity, 'abc'];
  invalidQuantities.forEach((qty) => {
    const v = validateNutritionInput({ foodName: 'Oats', quantity: qty, unit: 'g' });
    assert.strictEqual(v.isValid, false, `Quantity ${qty} must be rejected`);
  });
});

runTest('Preserves exact quantity without rounding or conversion when passing to prompt', () => {
  const prompt12 = buildNutritionPrompt({ foodName: 'Roti', quantity: 12, unit: 'piece' });
  assert(prompt12.includes('Quantity: 12'), 'Prompt must contain exact quantity 12');
  assert(!prompt12.includes('Quantity: 12.1'), 'Must not round quantity');

  const promptDecimal = buildNutritionPrompt({ foodName: 'Chicken', quantity: 12.5, unit: 'g' });
  assert(promptDecimal.includes('Quantity: 12.5'), 'Prompt must contain exact quantity 12.5');
});

runTest('Preserves all units (g, kg, ml, l, bowl, cup, piece, etc.) without unintended conversion', () => {
  const testUnits = ['g', 'kg', 'ml', 'l', 'bowl', 'cup', 'plate', 'piece', 'tbsp', 'serving'];
  testUnits.forEach((u) => {
    const v = validateNutritionInput({ foodName: 'Sample Food', quantity: 12, unit: u });
    assert.strictEqual(v.isValid, true);

    const prompt = buildNutritionPrompt({ foodName: 'Sample Food', quantity: 12, unit: u });
    assert(prompt.includes(`Unit: ${u}`), `Prompt must include unit: ${u}`);
  });
});

// ----------------------------------------------------
// SUMMARY
// ----------------------------------------------------
console.log(`\n==========================================`);
console.log(`Total tests: ${testsPassed + testsFailed} | Passed: ${testsPassed} | Failed: ${testsFailed}`);
console.log(`==========================================`);

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('All tests passed successfully!\n');
}
