import { describe, it, expect } from "vitest";
import recipesData from "../lib/data/recipes.json";

describe("Recipe Data Test Scenarios", () => {
  const recipes = recipesData.data.recipes;

  describe("Tuna Pasta Salad - Single serving, variety of ingredient types", () => {
    const tunaSalad = recipes.find((r) => r.name === "Tuna Pasta Salad");

    it("should have correct basic recipe properties", () => {
      expect(tunaSalad).toBeDefined();
      expect(tunaSalad!.yield).toBe(1);
      expect(tunaSalad!.ingredientsCollection.total).toBe(13);
      expect(tunaSalad!.sys.id).toBe("recipe_001");
    });

    it("should have variety of ingredient measurement types", () => {
      const ingredients = tunaSalad!.ingredientsCollection.items;

      // Should have ingredients with different measurement scales
      const measurements = ingredients
        .filter((item) => item.food && item.metricMeasurement > 0)
        .map((item) => item.metricMeasurement);

      expect(measurements).toContain(0.6); // Very small (chili flakes)
      expect(measurements).toContain(1); // Small (basil)
      expect(measurements).toContain(5); // Small liquid (tsp oil)
      expect(measurements).toContain(15); // Medium liquid (tbsp oil/vinegar)
      expect(measurements).toContain(50); // Medium solid (pasta)
      expect(measurements).toContain(100); // Large solid (tuna, tomatoes)
    });

    it("should have mixed solid and liquid ingredients", () => {
      const ingredients = tunaSalad!.ingredientsCollection.items;
      const liquidIngredients = ["Olive Oil", "Red Wine Vinegar"];
      const solidIngredients = ["pasta", "tinned tuna", "cherry tomatoes"];

      const hasLiquids = ingredients.some(
        (item) => item.food && liquidIngredients.includes(item.food.name)
      );
      const hasSolids = ingredients.some(
        (item) => item.food && solidIngredients.includes(item.food.name)
      );

      expect(hasLiquids).toBe(true);
      expect(hasSolids).toBe(true);
    });

    it("should have ingredients with and without nutrition inclusion", () => {
      const ingredients = tunaSalad!.ingredientsCollection.items;
      const nutritionIncluded = ingredients.filter(
        (item) => item.includedInNutrition === true
      );
      const nutritionExcluded = ingredients.filter(
        (item) => item.includedInNutrition === false
      );

      expect(nutritionIncluded.length).toBeGreaterThan(0);
      expect(nutritionExcluded.length).toBeGreaterThan(0);
    });

    it("should handle ingredients with zero measurements (to taste)", () => {
      const ingredients = tunaSalad!.ingredientsCollection.items;
      const zeroMeasurements = ingredients.filter(
        (item) => item.food && item.metricMeasurement === 0
      );

      expect(zeroMeasurements.length).toBe(2); // Salt and pepper
      expect(zeroMeasurements.every((item) => item.notes === "to taste")).toBe(
        true
      );
    });
  });

  describe("Chicken Stir Fry - Multiple servings (2), different measurement scales", () => {
    const stirFry = recipes.find((r) => r.name === "Chicken Stir Fry");

    it("should have correct serving size and ingredient count", () => {
      expect(stirFry).toBeDefined();
      expect(stirFry!.yield).toBe(2);
      expect(stirFry!.ingredientsCollection.total).toBe(8);
      expect(stirFry!.sys.id).toBe("recipe_002");
    });

    it("should have larger portion sizes for multiple servings", () => {
      const ingredients = stirFry!.ingredientsCollection.items;
      const measurements = ingredients
        .filter((item) => item.food && item.metricMeasurement > 0)
        .map((item) => item.metricMeasurement);

      // Should have larger base portions
      expect(measurements).toContain(200); // Chicken breast
      expect(measurements).toContain(150); // Mixed vegetables
      expect(measurements).toContain(30); // Oil and sauce portions (2 tbsp each)
    });

    it("should test serving size scaling calculations", () => {
      const nutrition = stirFry!.nutritionalSummary;

      // Per serving nutrition (recipe serves 2)
      expect(nutrition.energy).toBe(1456.32);
      expect(nutrition.protein).toBe(28.5);

      // Test scaling for different serving sizes
      const perPersonProtein = nutrition.protein;
      const for4PeopleProtein = perPersonProtein * 4;
      const for1PersonProtein = perPersonProtein;

      expect(for4PeopleProtein).toBe(114); // 28.5 * 4
      expect(for1PersonProtein).toBe(28.5);
    });

    it("should have asian cuisine specific ingredients", () => {
      const ingredients = stirFry!.ingredientsCollection.items;
      const asianIngredients = [
        "sesame oil",
        "soy sauce",
        "fresh ginger",
        "sesame seeds",
      ];

      const hasAsianIngredients = asianIngredients.every((ingredient) =>
        ingredients.some((item) => item.food && item.food.name === ingredient)
      );

      expect(hasAsianIngredients).toBe(true);
    });
  });

  describe("Smoothie Bowl - Single serving, liquid-heavy, smaller measurements", () => {
    const smoothie = recipes.find((r) => r.name === "Smoothie Bowl");

    it("should have correct basic properties", () => {
      expect(smoothie).toBeDefined();
      expect(smoothie!.yield).toBe(1);
      expect(smoothie!.ingredientsCollection.total).toBe(6);
      expect(smoothie!.sys.id).toBe("recipe_003");
    });

    it("should be liquid-heavy with precise small measurements", () => {
      const ingredients = smoothie!.ingredientsCollection.items;
      const liquidIngredient = ingredients.find(
        (item) => item.food && item.food.name === "coconut milk"
      );

      expect(liquidIngredient).toBeDefined();
      expect(liquidIngredient!.metricMeasurement).toBe(100); // ml

      // Should have smaller, more precise measurements
      const measurements = ingredients
        .filter((item) => item.food && item.metricMeasurement > 0)
        .map((item) => item.metricMeasurement)
        .filter((m): m is number => m !== undefined);

      expect(Math.max(...measurements)).toBe(120); // Largest is banana
      expect(Math.min(...measurements)).toBe(10); // Smallest is granola
    });

    it("should have health-focused superfood ingredients", () => {
      const ingredients = smoothie!.ingredientsCollection.items;
      const superfoods = ["chia seeds", "almond butter", "mixed berries"];

      const hasSuperfoods = superfoods.every((superfood) =>
        ingredients.some((item) => item.food && item.food.name === superfood)
      );

      expect(hasSuperfoods).toBe(true);
    });

    it("should test edge cases with very small measurements", () => {
      const ingredients = smoothie!.ingredientsCollection.items;
      const smallMeasurements = ingredients
        .filter(
          (item) =>
            item.food &&
            item.metricMeasurement > 0 &&
            item.metricMeasurement <= 16
        )
        .map((item) => ({
          name: item.food!.name,
          amount: item.metricMeasurement,
        }));

      expect(smallMeasurements.length).toBeGreaterThan(2);
      expect(smallMeasurements.some((item) => item.amount === 10)).toBe(true); // granola
      expect(smallMeasurements.some((item) => item.amount === 12)).toBe(true); // chia seeds
      expect(smallMeasurements.some((item) => item.amount === 16)).toBe(true); // almond butter
    });
  });

  describe("Cross-recipe comparison and edge cases", () => {
    it("should have different nutrition profiles per serving", () => {
      const nutritionData = recipes.map((recipe) => ({
        name: recipe.name,
        servings: recipe.yield,
        energyPerServing: recipe.nutritionalSummary.energy,
        proteinPerServing: recipe.nutritionalSummary.protein,
      }));

      // Each recipe should have different nutrition values
      const energyValues = nutritionData.map((n) => n.energyPerServing);
      const uniqueEnergyValues = new Set(energyValues);
      expect(uniqueEnergyValues.size).toBe(recipes.length);

      // Protein content should vary significantly
      const proteinValues = nutritionData.map((n) => n.proteinPerServing);
      expect(
        Math.max(...proteinValues) - Math.min(...proteinValues)
      ).toBeGreaterThan(10);
    });

    it("should handle different serving sizes correctly", () => {
      const servingSizes = recipes.map((recipe) => recipe.yield);

      expect(servingSizes).toContain(1); // Single serving recipes
      expect(servingSizes).toContain(2); // Multi-serving recipes
      expect(Math.max(...servingSizes)).toBeGreaterThan(1);
    });

    it("should have ingredients with various inclusion statuses", () => {
      const allIngredients = recipes.flatMap((recipe) =>
        recipe.ingredientsCollection.items.filter((item) => item.food)
      );

      const includedCount = allIngredients.filter(
        (item) => item.includedInNutrition === true
      ).length;
      const excludedCount = allIngredients.filter(
        (item) => item.includedInNutrition === false
      ).length;

      expect(includedCount).toBeGreaterThan(0);
      expect(excludedCount).toBeGreaterThan(0);
      expect(includedCount).toBeGreaterThan(excludedCount); // Most should be included
    });

    it("should handle measurement edge cases across all recipes", () => {
      const allMeasurements = recipes
        .flatMap((recipe) =>
          recipe.ingredientsCollection.items
            .filter(
              (item) => item.food && typeof item.metricMeasurement === "number"
            )
            .map((item) => item.metricMeasurement)
        )
        .filter((m): m is number => typeof m === "number");

      expect(allMeasurements).toContain(0); // Zero measurements (to taste)
      expect(allMeasurements.some((m) => m < 1)).toBe(true); // Sub-gram measurements
      expect(allMeasurements.some((m) => m >= 100)).toBe(true); // Large measurements

      // Should have good range of measurement sizes
      const nonZeroMeasurements = allMeasurements.filter((m) => m > 0);
      const minMeasurement = Math.min(...nonZeroMeasurements);
      const maxMeasurement = Math.max(...allMeasurements);

      expect(maxMeasurement / minMeasurement).toBeGreaterThan(100); // Wide range
    });
  });
});
