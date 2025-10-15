export interface SystemIdentifier {
  id: string;
}

export type FormatMetricFunction = (
  value: number,
  isLiquid?: boolean
) => string;

export type ConvertToImperialFunction = (
  value: number,
  isLiquid?: boolean
) => string;
