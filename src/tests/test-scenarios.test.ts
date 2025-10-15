import { describe, it, expect } from "vitest";
import recipesData from "../lib/data/recipes.json";
import { formatMetric, convertToImperial } from "../lib/data/conversion";

describe("Recipe Test Scenarios Integration", () => {
  const recipes = recipesData.data.recipes;

  describe("Test Scenario Integration: All recipes working together", () => {
    it("should handle all three test scenarios with different characteristics", () => {
      const tunaSalad = recipes.find((r) => r.name === "Tuna Pasta Salad")!;
      const stirFry = recipes.find((r) => r.name === "Chicken Stir Fry")!;
      const smoothie = recipes.find((r) => r.name === "Smoothie Bowl")!;

      expect(tunaSalad).toBeDefined();
      expect(stirFry).toBeDefined();
      expect(smoothie).toBeDefined();

      expect(tunaSalad.yield).toBe(1);
      expect(stirFry.yield).toBe(2);
      expect(smoothie.yield).toBe(1);

      expect(tunaSalad.ingredientsCollection.total).toBe(13);
      expect(stirFry.ingredientsCollection.total).toBe(8);
      expect(smoothie.ingredientsCollection.total).toBe(6);
    });

    it("should provide comprehensive measurement range coverage", () => {
      const allIngredients = recipes.flatMap((recipe) =>
        recipe.ingredientsCollection.items
          .filter(
            (item) => item.food && typeof item.metricMeasurement === "number"
          )
          .map((item) => ({
            name: item.food!.name,
            amount: item.metricMeasurement as number,
            recipe: recipe.name,
          }))
      );

      const amounts = allIngredients
        .map((item) => item.amount)
        .filter((amount) => amount > 0);

      const minAmount = Math.min(...amounts);
      const maxAmount = Math.max(...amounts);

      expect(minAmount).toBe(0.6);
      expect(maxAmount).toBe(200);
      expect(maxAmount / minAmount).toBeGreaterThan(300);

      const smallAmounts = amounts.filter((a) => a <= 10);
      const mediumAmounts = amounts.filter((a) => a > 10 && a <= 50);
      const largeAmounts = amounts.filter((a) => a > 50);

      expect(smallAmounts.length).toBeGreaterThan(5);
      expect(mediumAmounts.length).toBeGreaterThan(3);
      expect(largeAmounts.length).toBeGreaterThan(3);
    });

    it("should test unit conversion accuracy across all scenarios", () => {
      const testCases = [
        {
          amount: 0.6,
          isLiquid: false,
          metric: "0.6 g",
          imperial: "0.02 oz",
          source: "Chili flakes",
        },
        {
          amount: 5,
          isLiquid: true,
          metric: "5 ml",
          imperial: "0.17 fl oz",
          source: "Tsp olive oil",
        },
        {
          amount: 50,
          isLiquid: false,
          metric: "50 g",
          imperial: "1.76 oz",
          source: "Pasta",
        },
        {
          amount: 100,
          isLiquid: false,
          metric: "100 g",
          imperial: "3.53 oz",
          source: "Tuna",
        },

        {
          amount: 200,
          isLiquid: false,
          metric: "200 g",
          imperial: "7.05 oz",
          source: "Chicken",
        },
        {
          amount: 150,
          isLiquid: false,
          metric: "150 g",
          imperial: "5.29 oz",
          source: "Mixed vegetables",
        },
        {
          amount: 30,
          isLiquid: true,
          metric: "30 ml",
          imperial: "1.01 fl oz",
          source: "Sesame oil",
        },

        {
          amount: 100,
          isLiquid: true,
          metric: "100 ml",
          imperial: "3.38 fl oz",
          source: "Coconut milk",
        },
        {
          amount: 12,
          isLiquid: false,
          metric: "12 g",
          imperial: "0.42 oz",
          source: "Chia seeds",
        },
        {
          amount: 10,
          isLiquid: false,
          metric: "10 g",
          imperial: "0.35 oz",
          source: "Granola",
        },
      ];

      testCases.forEach(({ amount, isLiquid, metric, imperial, source }) => {
        expect(formatMetric(amount, isLiquid)).toBe(metric);
        expect(convertToImperial(amount, isLiquid)).toBe(imperial);
      });
    });

    it("should handle serving size scaling across different recipe types", () => {
      const scenarios = [
        {
          recipe: recipes.find((r) => r.name === "Tuna Pasta Salad")!,
          testServings: [0.5, 1, 2, 4],
          expectedNutrition: {
            0.5: { energy: 1082.985, protein: 16.8945 },
            1: { energy: 2165.97, protein: 33.789 },
            2: { energy: 4331.94, protein: 67.578 },
            4: { energy: 8663.88, protein: 135.156 },
          },
        },
        {
          recipe: recipes.find((r) => r.name === "Chicken Stir Fry")!,
          testServings: [1, 2, 4],
          expectedNutrition: {
            1: { energy: 1456.32, protein: 28.5 },
            2: { energy: 2912.64, protein: 57 },
            4: { energy: 5825.28, protein: 114 },
          },
        },
        {
          recipe: recipes.find((r) => r.name === "Smoothie Bowl")!,
          testServings: [0.5, 1, 3],
          expectedNutrition: {
            0.5: { energy: 446.225, protein: 7.6 },
            1: { energy: 892.45, protein: 15.2 },
            3: { energy: 2677.35, protein: 45.6 },
          },
        },
      ];

      scenarios.forEach(({ recipe, testServings, expectedNutrition }) => {
        testServings.forEach((servings) => {
          const scaledEnergy = recipe.nutritionalSummary.energy * servings;
          const scaledProtein = recipe.nutritionalSummary.protein * servings;

          const expected =
            expectedNutrition[servings as keyof typeof expectedNutrition];
          expect(expected).toBeDefined();
          if (expected) {
            expect(scaledEnergy).toBeCloseTo(expected.energy, 2);
            expect(scaledProtein).toBeCloseTo(expected.protein, 3);
          }
        });
      });
    });

    it("should handle mixed solid/liquid ingredient handling across all scenarios", () => {
      let liquidCount = 0;
      let solidCount = 0;

      recipes.forEach((recipe) => {
        recipe.ingredientsCollection.items.forEach((ingredient) => {
          if (ingredient.food && ingredient.metricMeasurement > 0) {
            // Identify liquid vs solid based on ingredient name patterns
            const name = ingredient.food.name.toLowerCase();
            const isLiquid =
              name.includes("oil") ||
              name.includes("vinegar") ||
              name.includes("milk") ||
              name.includes("sauce");

            if (isLiquid) {
              liquidCount++;
              // Verify liquid formatting
              expect(
                formatMetric(ingredient.metricMeasurement, true)
              ).toContain("ml");
            } else {
              solidCount++;
              // Verify solid formatting
              expect(
                formatMetric(ingredient.metricMeasurement, false)
              ).toContain("g");
            }
          }
        });
      });

      // Should have good mix of both types
      expect(liquidCount).toBeGreaterThan(2);
      expect(solidCount).toBeGreaterThan(10);
    });

    it("should handle edge cases with very small measurements across scenarios", () => {
      const allMeasurements = recipes.flatMap((recipe) =>
        recipe.ingredientsCollection.items
          .filter(
            (item) => item.food && typeof item.metricMeasurement === "number"
          )
          .map((item) => ({
            amount: item.metricMeasurement as number,
            name: item.food!.name,
            recipe: recipe.name,
          }))
      );

      // Find edge cases
      const zeroMeasurements = allMeasurements.filter(
        (item) => item.amount === 0
      );
      const verySmallMeasurements = allMeasurements.filter(
        (item) => item.amount > 0 && item.amount < 1
      );
      const smallMeasurements = allMeasurements.filter(
        (item) => item.amount >= 1 && item.amount <= 10
      );

      // Should have "to taste" items (zero measurements)
      expect(zeroMeasurements.length).toBe(2); // Salt and pepper from tuna salad

      // Should have very small measurements (< 1g/ml)
      expect(verySmallMeasurements.length).toBe(1); // Chili flakes 0.6g

      // Should have small but precise measurements
      expect(smallMeasurements.length).toBeGreaterThan(5);

      // Test conversion of edge cases
      verySmallMeasurements.forEach((item) => {
        expect(formatMetric(item.amount)).toContain("g");
        expect(convertToImperial(item.amount)).toMatch(/0\.\d{2} oz/);
      });
    });
  });

  describe("Real-world usage simulation", () => {
    it("should simulate complete nutrition display workflow for all test scenarios", () => {
      recipes.forEach((recipe) => {
        // Simulate component initialization
        const currentServingSize = 1;
        const useImperialUnits = false;

        // Calculate displayed nutrition
        const displayedNutrition = {
          energy: recipe.nutritionalSummary.energy * currentServingSize,
          protein: recipe.nutritionalSummary.protein * currentServingSize,
          fat: recipe.nutritionalSummary.fat * currentServingSize,
          carbohydrate:
            recipe.nutritionalSummary.carbohydrate * currentServingSize,
          fiber: recipe.nutritionalSummary.fibre * currentServingSize,
          sodium: recipe.nutritionalSummary.sodium * currentServingSize,
        };

        // Verify nutrition calculations
        expect(displayedNutrition.energy).toBeGreaterThan(0);
        expect(displayedNutrition.protein).toBeGreaterThan(0);

        // Calculate displayed ingredients
        const displayedIngredients = recipe.ingredientsCollection.items
          .filter((item) => item.food)
          .map((ingredient) => {
            const scaledAmount =
              (ingredient.metricMeasurement || 0) *
              (currentServingSize / recipe.yield);
            const isLiquid =
              ingredient.food!.name.toLowerCase().includes("oil") ||
              ingredient.food!.name.toLowerCase().includes("milk") ||
              ingredient.food!.name.toLowerCase().includes("vinegar") ||
              ingredient.food!.name.toLowerCase().includes("sauce");

            return {
              name: ingredient.food!.name,
              amount: scaledAmount,
              displayAmount:
                scaledAmount > 0
                  ? useImperialUnits
                    ? convertToImperial(scaledAmount, isLiquid)
                    : formatMetric(scaledAmount, isLiquid)
                  : "to taste",
              isLiquid,
              notes: ingredient.notes,
            };
          });

        // Verify ingredient calculations
        expect(displayedIngredients.length).toBeGreaterThan(0);
        displayedIngredients.forEach((ingredient) => {
          expect(ingredient.name).toBeDefined();
          expect(ingredient.displayAmount).toBeDefined();
        });
      });
    });
  });
});
