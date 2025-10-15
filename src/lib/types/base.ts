export interface SystemIdentifier {
  id: string;
}

export type FormatMetricFunction = (data: {
  value: number;
  isLiquid?: boolean;
  isEnergy?: boolean;
  isGram?: boolean;
  isMg?: boolean;
}) => string;

export type ConvertToImperialFunction = (data: {
  value: number;
  isLiquid?: boolean;
  isEnergy?: boolean;
  isGram?: boolean;
  isMg?: boolean;
}) => string;
