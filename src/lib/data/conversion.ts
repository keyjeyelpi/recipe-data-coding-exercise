import type {
  ConvertToImperialFunction,
  FormatMetricFunction,
} from "$lib/types/base";

import { CONVERSION_CONSTANTS } from "$lib/utils";

const formatMetricDecimal = (value: number): string => {
  if (value % 1 === 0) {
    return value.toFixed(1);
  } else {
    return parseFloat(value.toFixed(2)).toString();
  }
};

const formatImperialDecimal = (value: number): string => {
  if (value === 0) {
    return value.toFixed(2);
  } else {
    return parseFloat(value.toFixed(2)).toString();
  }
};

export const formatMetric: FormatMetricFunction = (
  value: number,
  isLiquid = false
): string => {
  if (isLiquid) {
    return value >= 1000
      ? `${formatMetricDecimal(value / 1000)} l`
      : `${value} ml`;
  }
  return value >= 1000
    ? `${formatMetricDecimal(value / 1000)} kg`
    : `${value} g`;
};

export const convertToImperial: ConvertToImperialFunction = (
  value: number,
  isLiquid = false
): string => {
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
