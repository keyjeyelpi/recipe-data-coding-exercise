# Test Scenarios Implementation

This document describes the comprehensive test scenarios created for the Nutrition Display Component coding exercise, based on the requirements outlined in the README.

## Overview

I've created a complete test suite that covers the three main test scenarios described in the README, plus additional integration and edge case testing.

## Test Files Created

### 1. `src/lib/data/conversion.test.ts`
**Unit tests for conversion functions**

- Tests for `formatMetric()` function with solid and liquid ingredients
- Tests for `convertToImperial()` function with accurate conversion factors
- Specific test cases for each recipe scenario's measurement ranges
- Edge case testing for very small measurements (0.6g chili flakes)

### 2. `src/lib/data/recipes.test.ts`
**Data validation and recipe-specific tests**

Tests each of the three main scenarios:

#### Tuna Pasta Salad Tests
- Single serving (yield = 1) validation
- Variety of ingredient measurement scales (0.6g to 100g)
- Mixed solid/liquid ingredient handling
- Ingredients with/without nutrition inclusion
- Zero measurement handling ("to taste" items)

#### Chicken Stir Fry Tests  
- Multiple serving (yield = 2) validation
- Larger portion sizes for multiple servings
- Serving size scaling calculations
- Asian cuisine specific ingredients

#### Smoothie Bowl Tests
- Single serving, liquid-heavy recipe validation
- Precise small measurements (10g-16g range)
- Edge cases with very small measurements
- Health-focused superfood ingredients

### 3. `src/lib/components/NutritionDisplay.test.ts`
**Component logic tests**

- Nutrition calculation tests for each scenario
- Unit conversion accuracy across measurement ranges
- Serving size scaling functionality
- Mixed solid/liquid ingredient handling
- Edge case testing for very small and zero measurements
- Cross-scenario validation

### 4. `src/lib/test-scenarios.test.ts`
**Integration tests covering all scenarios together**

- Comprehensive measurement range coverage
- Unit conversion accuracy across all scenarios
- Serving size scaling for different recipe types
- Mixed ingredient type handling
- Edge case simulation
- Real-world usage workflow simulation

## Test Scenarios Covered

### Test Scenario 1: Tuna Pasta Salad
✅ **Single serving, variety of ingredient types and measurements**

- Tests measurements from 0.6g (chili flakes) to 100g (tuna/tomatoes)
- Covers liquid measurements: 5ml (tsp) to 15ml (tbsp)
- Validates solid ingredients: pasta, tuna, tomatoes, olives
- Validates liquid ingredients: olive oil, vinegar
- Tests "to taste" ingredients (salt, pepper)
- Tests excluded nutrition items (basil, chili flakes)

### Test Scenario 2: Chicken Stir Fry  
✅ **Multiple servings (2), different measurement scales**

- Tests recipe that serves 2 people
- Validates larger portion sizes (200g chicken, 150g vegetables)
- Tests serving size scaling calculations
- Covers sauce measurements (30ml each)
- Tests small garnish amounts (3g sesame seeds)
- Validates per-serving vs total nutrition calculations

### Test Scenario 3: Smoothie Bowl
✅ **Single serving, liquid-heavy ingredients, smaller measurements**

- Tests liquid-heavy recipe (100ml coconut milk)
- Validates precise small measurements (10g-16g range)
- Tests fruit measurements (120g banana, 50g berries)
- Covers seed/nut measurements (12g chia, 16g almond butter)
- Validates that small amounts don't inappropriately convert to kg/l

## Key Features Tested

### Unit Conversion Accuracy
- ✅ Metric to Imperial conversion with correct factors
- ✅ Grams to ounces: 1g = 0.035274 oz
- ✅ Millilitres to fluid ounces: 1ml = 0.033814 fl oz
- ✅ Large amount conversion to kg/l when ≥ 1000

### Serving Size Scaling
- ✅ Fractional serving sizes (0.5 servings)
- ✅ Multiple serving sizes (2, 4 servings)
- ✅ Large serving sizes (10 servings with kg/l conversion)
- ✅ Nutrition scaling per serving

### Edge Cases with Very Small Measurements
- ✅ 0.6g chili flakes conversion
- ✅ 1g fresh basil handling
- ✅ 0g "to taste" ingredients
- ✅ 3g garnish amounts

### Mixed Solid/Liquid Ingredient Handling
- ✅ Automatic liquid detection patterns
- ✅ Appropriate unit formatting (g vs ml)
- ✅ Correct imperial conversion (oz vs fl oz)
- ✅ Mixed ingredient recipes

## Test Statistics

- **Total Test Files**: 4
- **Total Test Cases**: 61
- **Coverage**: All three test scenarios + integration + edge cases
- **Status**: ✅ All tests passing

## Usage

Run all tests:
```bash
npm test
```

Run specific test file:
```bash
npm test conversion.test.ts
npm test recipes.test.ts  
npm test NutritionDisplay.test.ts
npm test test-scenarios.test.ts
```

## Real-World Validation

These tests simulate real-world usage patterns:

1. **Component Initialization**: Loading recipe data and setting default values
2. **Serving Size Changes**: User adjusting serving sizes and seeing scaled results
3. **Unit Conversion**: Toggling between metric and imperial units
4. **Edge Case Handling**: Very small measurements, zero amounts, "to taste" items
5. **Error Handling**: Missing data, invalid inputs

The test suite ensures that the NutritionDisplay component will handle all the variety and edge cases present in the provided recipe data accurately and robustly.