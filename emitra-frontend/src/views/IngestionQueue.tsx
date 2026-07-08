import React from 'react';
import { useEmitra } from '../context/EmitraContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { HitlSplitScreen } from '../components/HitlSplitScreen';

export const IngestionQueue: React.FC = () => {
  const { getSelectedCompany } = useEmitra();
  const company = getSelectedCompany();

  if (!company) return <p className="text-gray-400">Select a company first.</p>;

  const pendingDocs = company.documents.filter((d) => d.status === 'PENDING_HITL');

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Ingestion Queue</h1>
      <p className="text-gray-400 mb-6">{company.name}</p>

      {pendingDocs.length > 0 ? (
        pendingDocs.map((doc) => (
          <Card key={doc.id} className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-medium">{doc.fileName}</span>
              <Badge status="PENDING">PENDING HITL</Badge>
            </div>
            <HitlSplitScreen
              documentImage={doc.fileName}
              initialValue={doc.rawExtractedData.fuelVolume ?? 0}
              fieldLabel="Fuel Volume (Liters)"
              unit="L"
              confidence={doc.confidenceScore}
              onConfirm={() => {}}
            />
          </Card>
        ))
      ) : (
        <Card>
          <p className="text-gray-400">No documents pending review. All validated. ✅</p>
        </Card>
      )}
    </div>
  );
};
