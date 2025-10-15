export function formatMetric(value: number, isLiquid = false): string {
  if (isLiquid) {
    return value >= 1000 ? `${(value / 1000).toFixed(1)} l` : `${value} ml`;
  }
  return value >= 1000 ? `${(value / 1000).toFixed(1)} kg` : `${value} g`;
}

export function convertToImperial(value: number, isLiquid = false): string {
  if (isLiquid) {
    return value >= 1000
      ? `${((value / 1000) * 33.814).toFixed(2)} fl oz`
      : `${(value * 0.033814).toFixed(2)} fl oz`;
  }
  return value >= 1000
    ? `${((value / 1000) * 35.274).toFixed(2)} oz`
    : `${(value * 0.035274).toFixed(2)} oz`;
}
