import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Company } from '../types/emitra';
import { mockCompanies } from '../data/mockData';

interface EmitraContextValue {
  companies: Company[];
  selectedCompanyId: number | null;
  selectCompany: (id: number) => void;
  getSelectedCompany: () => Company | undefined;
  tourStep: number;
  setTourStep: (step: number) => void;
}

const EmitraContext = createContext<EmitraContextValue | undefined>(undefined);

const STORAGE_KEY = 'emitra_demo_state';

export const EmitraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : mockCompanies;
  });
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(1);
  const [tourStep, setTourStepState] = useState<number>(() => {
    const saved = localStorage.getItem('emitra_tour_step');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
  }, [companies]);

  const selectCompany = (id: number) => setSelectedCompanyId(id);

  const getSelectedCompany = () => companies.find((c) => c.id === selectedCompanyId);

  const setTourStep = (step: number) => {
    setTourStepState(step);
    localStorage.setItem('emitra_tour_step', step.toString());
  };

  return (
    <EmitraContext.Provider value={{ companies, selectedCompanyId, selectCompany, getSelectedCompany, tourStep, setTourStep }}>
      {children}
    </EmitraContext.Provider>
  );
};

export function useEmitra(): EmitraContextValue {
  const ctx = useContext(EmitraContext);
  if (!ctx) throw new Error('useEmitra must be used within EmitraProvider');
  return ctx;
}
