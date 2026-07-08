import type { EmissionCalculationResult } from '../types/emitra';

/**
 * Converts calculation result to EU CBAM Registry-compatible XML.
 * Schema is simplified for demo purposes but structurally valid.
 */
export function generateCbamXml(
  companyName: string,
  emitterId: string,
  result: EmissionCalculationResult
): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<CbamDeclaration>
  <EmitterID>${emitterId}</EmitterID>
  <CompanyName>${escapeXml(companyName)}</CompanyName>
  <ReportingPeriod>2026</ReportingPeriod>
  <EmbeddedEmissions>
    <Scope1Direct>${result.totalDirectEmissions}</Scope1Direct>
    <Scope2Indirect>${result.totalIndirectEmissions}</Scope2Indirect>
    <TotalProductionTonnes>${result.totalProductionOutput}</TotalProductionTonnes>
    <EmbeddedEmissionsIntensity>${result.embeddedEmissionsIntensity}</EmbeddedEmissionsIntensity>
    <CbamCertificateExposureEur>${result.cbamCertificateExposureEur}</CbamCertificateExposureEur>
  </EmbeddedEmissions>
  <Methodology>EU-CBAM-2026-V1</Methodology>
  <GeneratedAt>${new Date().toISOString()}</GeneratedAt>
</CbamDeclaration>`;
  return xml;
}

export function downloadXml(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.xml') ? filename : `${filename}.xml`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
