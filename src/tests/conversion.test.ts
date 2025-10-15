import { describe, it, expect } from "vitest";
import { formatMetric, convertToImperial } from "$lib/data/conversion";

describe("Unit Conversion Functions", () => {
  describe("formatMetric", () => {
    describe("Solid ingredients (grams)", () => {
      it("should display small amounts in grams", () => {
        expect(formatMetric({ value: 50 })).toBe("50 g");
        expect(formatMetric({ value: 100 })).toBe("100 g");
        expect(formatMetric({ value: 999 })).toBe("999 g");
      });

      it("should convert large amounts to kilograms", () => {
        expect(formatMetric({ value: 1000 })).toBe("1.00 kg");
        expect(formatMetric({ value: 1500 })).toBe("1.50 kg");
        expect(formatMetric({ value: 2000 })).toBe("2.00 kg");
      });

      it("should handle edge cases with very small measurements", () => {
        expect(formatMetric({ value: 0.6 })).toBe("0.6 g");
        expect(formatMetric({ value: 1 })).toBe("1 g");
        expect(formatMetric({ value: 0 })).toBe("0 g");
      });
    });

    describe("Liquid ingredients (millilitres)", () => {
      it("should display small amounts in millilitres", () => {
        expect(formatMetric({ value: 5, isLiquid: true })).toBe("5 ml");
        expect(formatMetric({ value: 100, isLiquid: true })).toBe("100 ml");
        expect(formatMetric({ value: 999, isLiquid: true })).toBe("999 ml");
      });

      it("should convert large amounts to litres", () => {
        expect(formatMetric({ value: 1000, isLiquid: true })).toBe("1.00 l");
        expect(formatMetric({ value: 1500, isLiquid: true })).toBe("1.50 l");
        expect(formatMetric({ value: 2000, isLiquid: true })).toBe("2.00 l");
      });

      it("should handle edge cases with very small liquid measurements", () => {
        expect(formatMetric({ value: 15, isLiquid: true })).toBe("15 ml");
        expect(formatMetric({ value: 30, isLiquid: true })).toBe("30 ml");
        expect(formatMetric({ value: 0, isLiquid: true })).toBe("0 ml");
      });
    });
  });

  describe("convertToImperial", () => {
    describe("Solid ingredients (ounces)", () => {
      it("should convert grams to ounces for small amounts", () => {
        expect(convertToImperial({ value: 50 })).toBe("1.76 oz");
        expect(convertToImperial({ value: 100 })).toBe("3.53 oz");
        expect(convertToImperial({ value: 11 })).toBe("0.39 oz");
      });

      it("should convert larger amounts correctly", () => {
        expect(convertToImperial({ value: 1000 })).toBe("35.27 oz");
        expect(convertToImperial({ value: 200 })).toBe("7.05 oz");
      });

      it("should handle very small measurements", () => {
        expect(convertToImperial({ value: 0.6 })).toBe("0.02 oz");
        expect(convertToImperial({ value: 1 })).toBe("0.04 oz");
        expect(convertToImperial({ value: 3 })).toBe("0.11 oz");
      });
    });

    describe("Liquid ingredients (fluid ounces)", () => {
      it("should convert millilitres to fluid ounces for small amounts", () => {
        expect(convertToImperial({ value: 5, isLiquid: true })).toBe(
          "0.17 fl oz"
        );
        expect(convertToImperial({ value: 15, isLiquid: true })).toBe(
          "0.51 fl oz"
        );
        expect(convertToImperial({ value: 30, isLiquid: true })).toBe(
          "1.01 fl oz"
        );
      });

      it("should convert larger liquid amounts correctly", () => {
        expect(convertToImperial({ value: 100, isLiquid: true })).toBe(
          "3.38 fl oz"
        );
        expect(convertToImperial({ value: 1000, isLiquid: true })).toBe(
          "33.81 fl oz"
        );
      });

      it("should handle edge cases", () => {
        expect(convertToImperial({ value: 0, isLiquid: true })).toBe(
          "0.00 fl oz"
        );
        expect(convertToImperial({ value: 1, isLiquid: true })).toBe(
          "0.03 fl oz"
        );
      });
    });
  });

  describe("Real recipe test scenarios", () => {
    describe("Tuna Pasta Salad - Single serving, variety of measurements", () => {
      it("should handle pasta measurement (50g)", () => {
        expect(formatMetric({ value: 50 })).toBe("50 g");
        expect(convertToImperial({ value: 50 })).toBe("1.76 oz");
      });

      it("should handle olive oil measurements (5ml, 15ml)", () => {
        expect(formatMetric({ value: 5, isLiquid: true })).toBe("5 ml");
        expect(formatMetric({ value: 15, isLiquid: true })).toBe("15 ml");
        expect(convertToImperial({ value: 5, isLiquid: true })).toBe(
          "0.17 fl oz"
        );
        expect(convertToImperial({ value: 15, isLiquid: true })).toBe(
          "0.51 fl oz"
        );
      });

      it("should handle very small measurements (0.6g chili flakes)", () => {
        expect(formatMetric({ value: 0.6 })).toBe("0.6 g");
        expect(convertToImperial({ value: 0.6 })).toBe("0.02 oz");
      });

      it("should handle medium measurements (100g tuna, cherry tomatoes)", () => {
        expect(formatMetric({ value: 100 })).toBe("100 g");
        expect(convertToImperial({ value: 100 })).toBe("3.53 oz");
      });
    });

    describe("Chicken Stir Fry - Multiple servings (2), different scales", () => {
      it("should handle larger protein portions (200g chicken)", () => {
        expect(formatMetric({ value: 200 })).toBe("200 g");
        expect(convertToImperial({ value: 200 })).toBe("7.05 oz");
      });

      it("should handle vegetable portions (150g mixed vegetables)", () => {
        expect(formatMetric({ value: 150 })).toBe("150 g");
        expect(convertToImperial({ value: 150 })).toBe("5.29 oz");
      });

      it("should handle sauce measurements (30ml each)", () => {
        expect(formatMetric({ value: 30, isLiquid: true })).toBe("30 ml");
        expect(convertToImperial({ value: 30, isLiquid: true })).toBe(
          "1.01 fl oz"
        );
      });

      it("should handle small garnish amounts (3g sesame seeds)", () => {
        expect(formatMetric({ value: 3 })).toBe("3 g");
        expect(convertToImperial({ value: 3 })).toBe("0.11 oz");
      });
    });

    describe("Smoothie Bowl - Single serving, liquid-heavy, smaller measurements", () => {
      it("should handle fruit measurements (120g banana, 50g berries)", () => {
        expect(formatMetric({ value: 120 })).toBe("120 g");
        expect(formatMetric({ value: 50 })).toBe("50 g");
        expect(convertToImperial({ value: 120 })).toBe("4.23 oz");
        expect(convertToImperial({ value: 50 })).toBe("1.76 oz");
      });

      it("should handle liquid measurements (100ml coconut milk)", () => {
        expect(formatMetric({ value: 100, isLiquid: true })).toBe("100 ml");
        expect(convertToImperial({ value: 100, isLiquid: true })).toBe(
          "3.38 fl oz"
        );
      });

      it("should handle small seed/nut measurements (12g chia, 16g almond butter)", () => {
        expect(formatMetric({ value: 12 })).toBe("12 g");
        expect(formatMetric({ value: 16 })).toBe("16 g");
        expect(convertToImperial({ value: 12 })).toBe("0.42 oz");
        expect(convertToImperial({ value: 16 })).toBe("0.56 oz");
      });

      it("should handle very small topping amounts (10g granola)", () => {
        expect(formatMetric({ value: 10 })).toBe("10 g");
        expect(convertToImperial({ value: 10 })).toBe("0.35 oz");
      });
    });
  });
});
