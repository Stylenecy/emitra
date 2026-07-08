export type DocumentSector = 'IRON_STEEL' | 'ALUMINUM';
export type DocumentStatus = 'PROCESSING' | 'PENDING_HITL' | 'VALIDATED' | 'FAILED';
export type ScopeType = 'SCOPE_1_DIRECT' | 'SCOPE_2_INDIRECT';

export interface AuditTrailNode {
  sourceDocumentId: string;
  fileName: string;
  extractedValue: number;
  unit: string;
  extractionConfidence: number;
  timestamp: string;
  operatorNotes?: string;
}

export interface CbamDocument {
  id: string;
  fileName: string;
  uploadedAt: string;
  sector: DocumentSector;
  status: DocumentStatus;
  confidenceScore: number;
  fileSize: string;
  scope: ScopeType;
  rawExtractedData: {
    energyConsumption?: number; // kWh untuk PLN
    fuelVolume?: number; // Liter untuk Solar/BBM
    productionOutput: number; // Metric Tons baja/aluminium final
  };
  auditTrail: AuditTrailNode;
}

export interface EmissionCalculationResult {
  totalDirectEmissions: number; // Scope 1 (tCO2e)
  totalIndirectEmissions: number; // Scope 2 (tCO2e)
  totalProductionOutput: number; // Total metric tons
  embeddedEmissionsIntensity: number; // tCO2e per ton produk
  cbamCertificateExposureEur: number; // Estimasi biaya finansial (€75.36/ton)
}

export interface Company {
  id: number;
  name: string;
  location: string;
  sector: string;
  exportVolumeUsd: number;
  exportDestinations: string[];
  employees: number;
  complianceStatus: 'COMPLIANT' | 'NON_COMPLIANT';
  documents: CbamDocument[];
  results: {
    scope1Tonnes: number;
    scope2Tonnes: number;
    totalEmissions: number;
    embeddedEmissionPerTon: number;
    cbamCertificateCostEur: number;
    manualAuditCostIdr: number;
    emitraCostY1Idr: number;
    savingsY1Percent: number;
  };
}
