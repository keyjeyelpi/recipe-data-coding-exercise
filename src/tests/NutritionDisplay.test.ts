import { describe, it, expect } from 'vitest';
import recipesData from '../lib/data/recipes.json';
import { formatMetric, convertToImperial } from '../lib/data/conversion';

describe('NutritionDisplay Test Scenarios', () => {
  const recipes = recipesData.data.recipes;
  const tunaSalad = recipes.find(r => r.name === 'Tuna Pasta Salad')!;
  const stirFry = recipes.find(r => r.name === 'Chicken Stir Fry')!;
  const smoothie = recipes.find(r => r.name === 'Smoothie Bowl')!;

  describe('Test Scenario 1: Tuna Pasta Salad - Single serving, variety of ingredient types', () => {
    it('should calculate nutrition per serving correctly', () => {
      // Single serving recipe (yield = 1)
      expect(tunaSalad.yield).toBe(1);
      
      // Nutrition should be as-is (no scaling needed)
      expect(tunaSalad.nutritionalSummary.energy).toBe(2165.97);
      expect(tunaSalad.nutritionalSummary.protein).toBe(33.789);
      expect(tunaSalad.nutritionalSummary.fat).toBe(23.935);
    });

    it('should handle variety of measurement scales correctly', () => {
      const ingredients = tunaSalad.ingredientsCollection.items
        .filter(item => item.food && item.metricMeasurement > 0);
      
      // Test different measurement scales
      const measurements = ingredients.map(item => item.metricMeasurement);
      
      // Very small measurement (chili flakes)
      expect(measurements).toContain(0.6);
      expect(formatMetric(0.6)).toBe('0.6 g');
      expect(convertToImperial(0.6)).toBe('0.02 oz');
      
      // Small liquid measurement (tsp olive oil)
      expect(measurements).toContain(5);
      expect(formatMetric(5, true)).toBe('5 ml');
      expect(convertToImperial(5, true)).toBe('0.17 fl oz');
      
      // Medium measurement (pasta)
      expect(measurements).toContain(50);
      expect(formatMetric(50)).toBe('50 g');
      expect(convertToImperial(50)).toBe('1.76 oz');
      
      // Large measurement (tuna, tomatoes)
      expect(measurements).toContain(100);
      expect(formatMetric(100)).toBe('100 g');
      expect(convertToImperial(100)).toBe('3.53 oz');
    });

    it('should handle mixed solid and liquid ingredients', () => {
      const ingredients = tunaSalad.ingredientsCollection.items;
      
      // Liquid ingredients
      const oliveOil = ingredients.find(item => 
        item.food?.name === 'Olive Oil' && item.metricMeasurement === 5
      );
      expect(oliveOil).toBeDefined();
      expect(formatMetric(oliveOil!.metricMeasurement as number, true)).toBe('5 ml');
      
      // Solid ingredients
      const pasta = ingredients.find(item => item.food?.name === 'pasta');
      expect(pasta).toBeDefined();
      expect(formatMetric(pasta!.metricMeasurement as number)).toBe('50 g');
    });

    it('should handle edge cases with very small measurements', () => {
      const chiliFlakes = tunaSalad.ingredientsCollection.items.find(
        item => item.food?.name === 'dried chilli flakes'
      );
      
      expect(chiliFlakes).toBeDefined();
      expect(chiliFlakes!.metricMeasurement).toBe(0.6);
      
      // Should format very small amounts appropriately
      expect(formatMetric(0.6)).toBe('0.6 g');
      expect(convertToImperial(0.6)).toBe('0.02 oz');
    });
  });

  describe('Test Scenario 2: Chicken Stir Fry - Multiple servings (2), different measurement scales', () => {
    it('should handle nutrition scaling for multiple servings', () => {
      // Recipe serves 2
      expect(stirFry.yield).toBe(2);
      
      // Nutrition shown should be per serving
      const nutritionPerServing = stirFry.nutritionalSummary;
      expect(nutritionPerServing.energy).toBe(1456.32);
      expect(nutritionPerServing.protein).toBe(28.5);
      
      // Test scaling for different serving sizes
      function scaleNutrition(servings: number) {
        return {
          energy: nutritionPerServing.energy * servings,
          protein: nutritionPerServing.protein * servings
        };
      }
      
      // For 1 person
      const for1Person = scaleNutrition(1);
      expect(for1Person.energy).toBe(1456.32);
      expect(for1Person.protein).toBe(28.5);
      
      // For 4 people
      const for4People = scaleNutrition(4);
      expect(for4People.energy).toBe(5825.28);
      expect(for4People.protein).toBe(114);
    });

    it('should handle larger ingredient portions correctly', () => {
      const ingredients = stirFry.ingredientsCollection.items;
      
      // Larger protein portion
      const chicken = ingredients.find(item => item.food?.name === 'chicken breast');
      expect(chicken!.metricMeasurement).toBe(200);
      expect(formatMetric(200)).toBe('200 g');
      expect(convertToImperial(200)).toBe('7.05 oz');
      
      // Larger vegetable portion
      const vegetables = ingredients.find(item => item.food?.name === 'mixed vegetables');
      expect(vegetables!.metricMeasurement).toBe(150);
      expect(formatMetric(150)).toBe('150 g');
      expect(convertToImperial(150)).toBe('5.29 oz');
    });

    it('should handle serving size scaling calculations', () => {
      const ingredients = stirFry.ingredientsCollection.items;
      const chickenAmount = 200; // grams for 2 servings
      
      // Function to scale ingredients based on desired servings vs recipe servings
      function scaleIngredient(originalAmount: number, desiredServings: number, recipeServings: number) {
        return originalAmount * (desiredServings / recipeServings);
      }
      
      // For 1 serving (half the recipe)
      const chickenFor1 = scaleIngredient(chickenAmount, 1, stirFry.yield);
      expect(chickenFor1).toBe(100);
      
      // For 4 servings (double the recipe)
      const chickenFor4 = scaleIngredient(chickenAmount, 4, stirFry.yield);
      expect(chickenFor4).toBe(400);
      
      // Large amounts should convert to appropriate units
      expect(formatMetric(chickenFor4)).toBe('400 g');
      expect(convertToImperial(chickenFor4)).toBe('14.11 oz');
    });
  });

  describe('Test Scenario 3: Smoothie Bowl - Single serving, liquid-heavy, smaller measurements', () => {
    it('should handle liquid-heavy ingredients appropriately', () => {
      const ingredients = smoothie.ingredientsCollection.items;
      
      // Primary liquid ingredient
      const coconutMilk = ingredients.find(item => item.food?.name === 'coconut milk');
      expect(coconutMilk!.metricMeasurement).toBe(100);
      expect(formatMetric(100, true)).toBe('100 ml');
      expect(convertToImperial(100, true)).toBe('3.38 fl oz');
    });

    it('should handle very small, precise measurements', () => {
      const ingredients = smoothie.ingredientsCollection.items;
      
      // Small seed measurement
      const chiaSeeds = ingredients.find(item => item.food?.name === 'chia seeds');
      expect(chiaSeeds!.metricMeasurement).toBe(12);
      expect(formatMetric(12)).toBe('12 g');
      expect(convertToImperial(12)).toBe('0.42 oz');
      
      // Small nut butter measurement
      const almondButter = ingredients.find(item => item.food?.name === 'almond butter');
      expect(almondButter!.metricMeasurement).toBe(16);
      expect(formatMetric(16)).toBe('16 g');
      expect(convertToImperial(16)).toBe('0.56 oz');
      
      // Very small topping
      const granola = ingredients.find(item => item.food?.name === 'granola');
      expect(granola!.metricMeasurement).toBe(10);
      expect(formatMetric(10)).toBe('10 g');
      expect(convertToImperial(10)).toBe('0.35 oz');
    });

    it('should not convert small amounts to larger units inappropriately', () => {
      const ingredients = smoothie.ingredientsCollection.items;
      const measurements = ingredients
        .filter(item => item.food && typeof item.metricMeasurement === 'number' && item.metricMeasurement > 0)
        .map(item => item.metricMeasurement as number);
      
      // All measurements should be small enough to stay in g/ml
      const maxMeasurement = Math.max(...measurements);
      expect(maxMeasurement).toBe(120); // Banana
      
      // None should convert to kg or litres at normal serving sizes
      measurements.forEach(amount => {
        const metricSolid = formatMetric(amount);
        const metricLiquid = formatMetric(amount, true);
        expect(metricSolid).not.toContain('kg');
        expect(metricLiquid).not.toContain(' l'); // Space before 'l' to avoid matching 'ml'
      });
    });

    it('should handle scaling to larger serving sizes appropriately', () => {
      const ingredients = smoothie.ingredientsCollection.items;
      const coconutMilk = ingredients.find(item => item.food?.name === 'coconut milk')!;
      const banana = ingredients.find(item => item.food?.name === 'banana')!;
      
      // Scale for 10 servings
      const coconutMilk10x = (coconutMilk.metricMeasurement as number) * 10; // 1000ml
      const banana10x = (banana.metricMeasurement as number) * 10; // 1200g
      
      // Large amounts should convert to appropriate units
      expect(formatMetric(coconutMilk10x, true)).toBe('1.0 l');
      expect(formatMetric(banana10x)).toBe('1.2 kg');
    });
  });

  describe('Cross-scenario unit conversion accuracy tests', () => {
    it('should maintain conversion accuracy across different measurement ranges', () => {
      const testValues = [
        { grams: 0.6, expectedOz: '0.02 oz' },    // Chili flakes
        { grams: 10, expectedOz: '0.35 oz' },     // Granola
        { grams: 50, expectedOz: '1.76 oz' },     // Pasta
        { grams: 100, expectedOz: '3.53 oz' },    // Tuna
        { grams: 200, expectedOz: '7.05 oz' },    // Chicken
      ];
      
      testValues.forEach(({ grams, expectedOz }) => {
        expect(convertToImperial(grams)).toBe(expectedOz);
      });
      
      const liquidTestValues = [
        { ml: 5, expectedFlOz: '0.17 fl oz' },    // Tsp oil
        { ml: 15, expectedFlOz: '0.51 fl oz' },   // Tbsp oil
        { ml: 30, expectedFlOz: '1.01 fl oz' },   // Sauce
        { ml: 100, expectedFlOz: '3.38 fl oz' },  // Coconut milk
      ];
      
      liquidTestValues.forEach(({ ml, expectedFlOz }) => {
        expect(convertToImperial(ml, true)).toBe(expectedFlOz);
      });
    });

    it('should handle edge cases consistently across all scenarios', () => {
      // Zero measurements (to taste items)
      expect(formatMetric(0)).toBe('0 g');
      expect(formatMetric(0, true)).toBe('0 ml');
      expect(convertToImperial(0)).toBe('0.00 oz');
      expect(convertToImperial(0, true)).toBe('0.00 fl oz');
      
      // Very large measurements (bulk cooking)
      expect(formatMetric(2000)).toBe('2.0 kg');
      expect(formatMetric(2000, true)).toBe('2.0 l');
    });
  });
});