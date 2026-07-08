import type { EmissionCalculationResult } from '../types/emitra';

const CBAM_PRICE_PER_TON_EUR = 75.36; // from .env, hardcoded for demo

/**
 * Deterministic emission calculation engine.
 * Formula (EU CBAM methodology):
 *   E_embedded = (DirEm + IndEm) / Prod_Alg
 * Where DirEm = Scope 1, IndEm = Scope 2, Prod_Alg = total output.
 */
export function calculateEmissions(
  directEmissions: number, // Scope 1 (tCO2e)
  indirectEmissions: number, // Scope 2 (tCO2e)
  productionOutput: number // Metric tons
): EmissionCalculationResult {
  const totalDirect = directEmissions;
  const totalIndirect = indirectEmissions;
  const totalOutput = productionOutput;

  const embeddedIntensity =
    totalOutput > 0 ? (totalDirect + totalIndirect) / totalOutput : 0;

  const cbamExposureEur = embeddedIntensity * CBAM_PRICE_PER_TON_EUR;

  return {
    totalDirectEmissions: roundTo(totalDirect, 2),
    totalIndirectEmissions: roundTo(totalIndirect, 2),
    totalProductionOutput: roundTo(totalOutput, 2),
    embeddedEmissionsIntensity: roundTo(embeddedIntensity, 4),
    cbamCertificateExposureEur: roundTo(cbamExposureEur, 2),
  };
}

function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
