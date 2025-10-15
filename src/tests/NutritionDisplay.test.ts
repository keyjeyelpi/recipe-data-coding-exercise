import { describe, it, expect } from "vitest";
import recipesData from "$lib/data/recipes.json";
import { formatMetric, convertToImperial } from "$lib/data/conversion";

describe("NutritionDisplay Test Scenarios", () => {
  const recipes = recipesData.data.recipes;
  const tunaSalad = recipes.find((r) => r.name === "Tuna Pasta Salad")!;
  const stirFry = recipes.find((r) => r.name === "Chicken Stir Fry")!;
  const smoothie = recipes.find((r) => r.name === "Smoothie Bowl")!;

  describe("Test Scenario 1: Tuna Pasta Salad - Single serving, variety of ingredient types", () => {
    it("should calculate nutrition per serving correctly", () => {
      expect(tunaSalad.yield).toBe(1);

      expect(tunaSalad.nutritionalSummary.energy).toBe(2165.97);
      expect(tunaSalad.nutritionalSummary.protein).toBe(33.789);
      expect(tunaSalad.nutritionalSummary.fat).toBe(23.935);
    });

    it("should handle variety of measurement scales correctly", () => {
      const ingredients = tunaSalad.ingredientsCollection.items.filter(
        (item) => item.food && item.metricMeasurement > 0
      );

      const measurements = ingredients.map((item) => item.metricMeasurement);

      expect(measurements).toContain(0.6);
      expect(formatMetric({ value: 0.6 })).toBe("0.6 g");
      expect(convertToImperial({ value: 0.6 })).toBe("0.02 oz");

      expect(measurements).toContain(5);
      expect(formatMetric({ value: 5, isLiquid: true })).toBe("5 ml");
      expect(convertToImperial({ value: 5, isLiquid: true })).toBe(
        "0.17 fl oz"
      );

      expect(measurements).toContain(50);
      expect(formatMetric({ value: 50 })).toBe("50 g");
      expect(convertToImperial({ value: 50 })).toBe("1.76 oz");

      expect(measurements).toContain(100);
      expect(formatMetric({ value: 100 })).toBe("100 g");
      expect(convertToImperial({ value: 100 })).toBe("3.53 oz");
    });

    it("should handle mixed solid and liquid ingredients", () => {
      const ingredients = tunaSalad.ingredientsCollection.items;

      const oliveOil = ingredients.find(
        (item) =>
          item.food?.name === "Olive Oil" && item.metricMeasurement === 5
      );
      expect(oliveOil).toBeDefined();
      expect(
        formatMetric({
          value: oliveOil!.metricMeasurement as number,
          isLiquid: true,
        })
      ).toBe("5 ml");

      const pasta = ingredients.find((item) => item.food?.name === "pasta");
      expect(pasta).toBeDefined();
      expect(formatMetric({ value: pasta!.metricMeasurement as number })).toBe(
        "50 g"
      );
    });

    it("should handle edge cases with very small measurements", () => {
      const chiliFlakes = tunaSalad.ingredientsCollection.items.find(
        (item) => item.food?.name === "dried chilli flakes"
      );

      expect(chiliFlakes).toBeDefined();
      expect(chiliFlakes!.metricMeasurement).toBe(0.6);

      expect(formatMetric({ value: 0.6 })).toBe("0.6 g");
      expect(convertToImperial({ value: 0.6 })).toBe("0.02 oz");
    });
  });

  describe("Test Scenario 2: Chicken Stir Fry - Multiple servings (2), different measurement scales", () => {
    it("should handle nutrition scaling for multiple servings", () => {
      expect(stirFry.yield).toBe(2);

      const nutritionPerServing = stirFry.nutritionalSummary;
      expect(nutritionPerServing.energy).toBe(1456.32);
      expect(nutritionPerServing.protein).toBe(28.5);

      function scaleNutrition(servings: number) {
        return {
          energy: nutritionPerServing.energy * servings,
          protein: nutritionPerServing.protein * servings,
        };
      }

      const for1Person = scaleNutrition(1);
      expect(for1Person.energy).toBe(1456.32);
      expect(for1Person.protein).toBe(28.5);

      const for4People = scaleNutrition(4);
      expect(for4People.energy).toBe(5825.28);
      expect(for4People.protein).toBe(114);
    });

    it("should handle larger ingredient portions correctly", () => {
      const ingredients = stirFry.ingredientsCollection.items;

      const chicken = ingredients.find(
        (item) => item.food?.name === "chicken breast"
      );
      expect(chicken!.metricMeasurement).toBe(200);
      expect(formatMetric({ value: 200 })).toBe("200 g");
      expect(convertToImperial({ value: 200 })).toBe("7.05 oz");

      const vegetables = ingredients.find(
        (item) => item.food?.name === "mixed vegetables"
      );
      expect(vegetables!.metricMeasurement).toBe(150);
      expect(formatMetric({ value: 150 })).toBe("150 g");
      expect(convertToImperial({ value: 150 })).toBe("5.29 oz");
    });

    it("should handle serving size scaling calculations", () => {
      const ingredients = stirFry.ingredientsCollection.items;
      const chickenAmount = 200;

      function scaleIngredient(
        originalAmount: number,
        desiredServings: number,
        recipeServings: number
      ) {
        return originalAmount * (desiredServings / recipeServings);
      }

      const chickenFor1 = scaleIngredient(chickenAmount, 1, stirFry.yield);
      expect(chickenFor1).toBe(100);

      const chickenFor4 = scaleIngredient(chickenAmount, 4, stirFry.yield);
      expect(chickenFor4).toBe(400);

      expect(formatMetric({ value: chickenFor4 })).toBe("400 g");
      expect(convertToImperial({ value: chickenFor4 })).toBe("14.11 oz");
    });
  });

  describe("Test Scenario 3: Smoothie Bowl - Single serving, liquid-heavy, smaller measurements", () => {
    it("should handle liquid-heavy ingredients appropriately", () => {
      const ingredients = smoothie.ingredientsCollection.items;

      const coconutMilk = ingredients.find(
        (item) => item.food?.name === "coconut milk"
      );
      expect(coconutMilk!.metricMeasurement).toBe(100);
      expect(formatMetric({ value: 100, isLiquid: true })).toBe("100 ml");
      expect(convertToImperial({ value: 100, isLiquid: true })).toBe(
        "3.38 fl oz"
      );
    });

    it("should handle very small, precise measurements", () => {
      const ingredients = smoothie.ingredientsCollection.items;

      const chiaSeeds = ingredients.find(
        (item) => item.food?.name === "chia seeds"
      );
      expect(chiaSeeds!.metricMeasurement).toBe(12);
      expect(formatMetric({ value: 12 })).toBe("12 g");
      expect(convertToImperial({ value: 12 })).toBe("0.42 oz");

      const almondButter = ingredients.find(
        (item) => item.food?.name === "almond butter"
      );
      expect(almondButter!.metricMeasurement).toBe(16);
      expect(formatMetric({ value: 16 })).toBe("16 g");
      expect(convertToImperial({ value: 16 })).toBe("0.56 oz");

      const granola = ingredients.find((item) => item.food?.name === "granola");
      expect(granola!.metricMeasurement).toBe(10);
      expect(formatMetric({ value: 10 })).toBe("10 g");
      expect(convertToImperial({ value: 10 })).toBe("0.35 oz");
    });

    it("should not convert small amounts to larger units inappropriately", () => {
      const ingredients = smoothie.ingredientsCollection.items;
      const measurements = ingredients
        .filter(
          (item) =>
            item.food &&
            typeof item.metricMeasurement === "number" &&
            item.metricMeasurement > 0
        )
        .map((item) => item.metricMeasurement as number);

      const maxMeasurement = Math.max(...measurements);
      expect(maxMeasurement).toBe(120);

      measurements.forEach((amount) => {
        const metricSolid = formatMetric({ value: amount });
        const metricLiquid = formatMetric({ value: amount, isLiquid: true });
        expect(metricSolid).not.toContain("kg");
        expect(metricLiquid).not.toContain(" l");
      });
    });

    it("should handle scaling to larger serving sizes appropriately", () => {
      const ingredients = smoothie.ingredientsCollection.items;
      const coconutMilk = ingredients.find(
        (item) => item.food?.name === "coconut milk"
      )!;
      const banana = ingredients.find((item) => item.food?.name === "banana")!;

      const coconutMilk10x = (coconutMilk.metricMeasurement as number) * 10; // 1000ml
      const banana10x = (banana.metricMeasurement as number) * 10; // 1200g

      expect(formatMetric({ value: coconutMilk10x, isLiquid: true })).toBe(
        "1.00 l"
      );
      expect(formatMetric({ value: banana10x })).toBe("1.20 kg");
    });
  });

  describe("Cross-scenario unit conversion accuracy tests", () => {
    it("should maintain conversion accuracy across different measurement ranges", () => {
      const testValues = [
        { grams: 0.6, expectedOz: "0.02 oz" },
        { grams: 10, expectedOz: "0.35 oz" },
        { grams: 50, expectedOz: "1.76 oz" },
        { grams: 100, expectedOz: "3.53 oz" },
        { grams: 200, expectedOz: "7.05 oz" },
      ];

      testValues.forEach(({ grams, expectedOz }) => {
        expect(convertToImperial({ value: grams })).toBe(expectedOz);
      });

      const liquidTestValues = [
        { ml: 5, expectedFlOz: "0.17 fl oz" },
        { ml: 15, expectedFlOz: "0.51 fl oz" },
        { ml: 30, expectedFlOz: "1.01 fl oz" },
        { ml: 100, expectedFlOz: "3.38 fl oz" },
      ];

      liquidTestValues.forEach(({ ml, expectedFlOz }) => {
        expect(convertToImperial({ value: ml, isLiquid: true })).toBe(
          expectedFlOz
        );
      });
    });

    it("should handle edge cases consistently across all scenarios", () => {
      expect(formatMetric({ value: 0 })).toBe("0 g");
      expect(formatMetric({ value: 0, isLiquid: true })).toBe("0 ml");
      expect(convertToImperial({ value: 0 })).toBe("0.00 oz");
      expect(convertToImperial({ value: 0, isLiquid: true })).toBe(
        "0.00 fl oz"
      );

      expect(formatMetric({ value: 2000 })).toBe("2.00 kg");
      expect(formatMetric({ value: 2000, isLiquid: true })).toBe("2.00 l");
    });
  });
});
