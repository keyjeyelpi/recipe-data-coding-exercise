import type {
  ConvertToImperialFunction,
  FormatMetricFunction,
} from "$lib/types/base";

import { CONVERSION_CONSTANTS } from "$lib/utils";

const formatMetricDecimal = (value: number): string => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatImperialDecimal = (value: number): string => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatMetric: FormatMetricFunction = ({
  value,
  isLiquid,
  isEnergy,
  isGram,
  isMg,
}): string => {
  if (isEnergy) {
    return `${formatMetricDecimal(value)} kCal`;
  }

  if (isMg) {
    return `${formatMetricDecimal(value)} mg`;
  }

  if (isGram) {
    return `${formatMetricDecimal(value)} g`;
  }

  if (isLiquid) {
    return value >= 1000
      ? `${formatMetricDecimal(value / 1000)} l`
      : `${value} ml`;
  }
  return value >= 1000
    ? `${formatMetricDecimal(value / 1000)} kg`
    : `${value} g`;
};

export const convertToImperial: ConvertToImperialFunction = ({
  value,
  isLiquid,
  isEnergy,
  isGram,
  isMg,
}): string => {
  if (isEnergy) {
    return `${formatImperialDecimal(
      value / CONVERSION_CONSTANTS.KJ_TO_KCAL
    )} kJ`;
  }

  if (isMg) {
    return `${formatImperialDecimal(
      value * CONVERSION_CONSTANTS.MILLIGRAMS_TO_OUNCES
    )} oz`;
  }

  if (isGram) {
    return `${formatImperialDecimal(
      value * CONVERSION_CONSTANTS.GRAMS_TO_OUNCES
    )} oz`;
  }

  if (isLiquid) {
    return value >= 1000
      ? `${formatImperialDecimal(
          (value / 1000) * CONVERSION_CONSTANTS.LITRES_TO_FL_OZ
        )} fl oz`
      : `${formatImperialDecimal(
          value * CONVERSION_CONSTANTS.ML_TO_FL_OZ
        )} fl oz`;
  }

  return value >= 1000
    ? `${formatImperialDecimal(
        (value / 1000) * CONVERSION_CONSTANTS.KILOGRAMS_TO_OUNCES
      )} oz`
    : `${formatImperialDecimal(
        value * CONVERSION_CONSTANTS.GRAMS_TO_OUNCES
      )} oz`;
};
