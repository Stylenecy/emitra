import React from 'react';
import { useEmitra } from '../context/EmitraContext';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

export const DashboardStats: React.FC = () => {
  const { companies } = useEmitra();

  const totalCO2 = companies.reduce((sum, c) => sum + c.results.totalEmissions, 0);
  const avgSavings = Math.round(
    companies.reduce((sum, c) => sum + c.results.savingsY1Percent, 0) / companies.length
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <p className="text-sm text-gray-400">Active Clients</p>
        <p className="text-3xl font-bold text-white">{companies.length}</p>
      </Card>
      <Card>
        <p className="text-sm text-gray-400">Total CO₂ Tracked</p>
        <p className="text-3xl font-bold text-emeraldc">{totalCO2.toFixed(0)} t</p>
      </Card>
      <Card>
        <p className="text-sm text-gray-400">Avg Savings</p>
        <p className="text-3xl font-bold text-amberc">{avgSavings}%</p>
      </Card>
    </div>
  );
};
