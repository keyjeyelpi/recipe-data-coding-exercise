import { convertToImperial, formatMetric } from "$lib/data/conversion";
import type { Ingredient, ScaledIngredient } from "$lib/types/ingredient";
import type { ScaledNutrition } from "$lib/types/nutrition";
import type { Recipe } from "$lib/types/recipe";

export const CONVERSION_CONSTANTS = {
  GRAMS_TO_OUNCES: 0.0352739907,
  KILOGRAMS_TO_OUNCES: 35.274,
  ML_TO_FL_OZ: 0.033814,
  LITRES_TO_FL_OZ: 33.814,
  KJ_TO_KCAL: 0.239006,
} as const;

export const VALIDATION_CONSTANTS = {
  MIN_SERVING_SIZE: 0.1,
  MAX_SERVING_SIZE: 50,
} as const;

export const LIQUID_KEYWORDS: readonly string[] = [
  "oil",
  "vinegar",
  "milk",
  "sauce",
  "juice",
  "water",
  "broth",
  "stock",
  "wine",
  "beer",
  "syrup",
  "honey",
];

export function isLiquidIngredient(name: string): boolean {
  return LIQUID_KEYWORDS.some((keyword) =>
    name.toLowerCase().includes(keyword)
  );
}

export function scaleNutrition(
  nutrition: Recipe["nutritionalSummary"],
  desiredServings: number,
  useImperialUnits = false
): ScaledNutrition {
  return {
    energy:
      (nutrition.energy * desiredServings) /
      (useImperialUnits ? CONVERSION_CONSTANTS.KJ_TO_KCAL : 1),
    fat:
      (nutrition.fat * desiredServings) /
      (useImperialUnits ? CONVERSION_CONSTANTS.GRAMS_TO_OUNCES : 1),
    fibre:
      (nutrition.fibre * desiredServings) /
      (useImperialUnits ? CONVERSION_CONSTANTS.GRAMS_TO_OUNCES : 1),
    protein:
      (nutrition.protein * desiredServings) /
      (useImperialUnits ? CONVERSION_CONSTANTS.GRAMS_TO_OUNCES : 1),
    carbohydrate:
      (nutrition.carbohydrate * desiredServings) /
      (useImperialUnits ? CONVERSION_CONSTANTS.GRAMS_TO_OUNCES : 1),
    sodium:
      (nutrition.sodium * desiredServings) /
      (useImperialUnits ? CONVERSION_CONSTANTS.GRAMS_TO_OUNCES / 1000 : 1),
  };
}

export function scaleIngredient(
  ingredient: Ingredient,
  desiredServings: number,
  recipeYield: number,
  useImperialUnits = false
): ScaledIngredient {
  if (!ingredient.food) {
    return ingredient;
  }

  const scaledAmount =
    Math.round(
      (ingredient.metricMeasurement || 0) *
        (desiredServings / recipeYield) *
        100
    ) / 100;
  const isLiquid = isLiquidIngredient(ingredient.food.name);

  return {
    ...ingredient,
    scaledAmount,
    displayAmount: useImperialUnits
      ? convertToImperial(scaledAmount, isLiquid)
      : formatMetric(scaledAmount, isLiquid),
  };
}

export function scaleIngredients(
  ingredients: Ingredient[],
  desiredServings: number,
  recipeYield: number,
  useImperialUnits = false
): ScaledIngredient[] {
  return ingredients.map((ingredient) =>
    scaleIngredient(ingredient, desiredServings, recipeYield, useImperialUnits)
  );
}
