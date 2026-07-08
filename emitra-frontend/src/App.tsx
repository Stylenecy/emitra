import { Routes, Route } from 'react-router-dom';
import { Landing } from './views/Landing';
import { InternalLayout } from './components/InternalLayout';
import { Dashboard } from './views/Dashboard';
import { UploadView } from './views/Upload';
import { ValidateView } from './views/Validate';
import { CalculateView } from './views/Calculate';
import { ComplianceReport } from './views/ComplianceReport';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<InternalLayout><Dashboard /></InternalLayout>} />
      <Route path="/upload" element={<InternalLayout><UploadView /></InternalLayout>} />
      <Route path="/validate" element={<InternalLayout><ValidateView /></InternalLayout>} />
      <Route path="/calculate" element={<InternalLayout><CalculateView /></InternalLayout>} />
      <Route path="/report" element={<InternalLayout><ComplianceReport /></InternalLayout>} />
    </Routes>
  );
}
