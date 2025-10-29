
import React, { useState } from 'react';
import type { UserPreferences, Currency } from '../types';

interface PartPickerFormProps {
  onGenerate: (preferences: UserPreferences) => void;
  isLoading: boolean;
}

const useCaseOptions: UserPreferences['useCase'][] = ['Gaming', 'Workstation', 'Video Editing', 'General Use'];
const currencyOptions: Currency[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];
const cpuOptions: UserPreferences['cpuPreference'][] = ['No Preference', 'Intel', 'AMD'];
const gpuOptions: UserPreferences['gpuPreference'][] = ['No Preference', 'NVIDIA', 'AMD'];

export const PartPickerForm: React.FC<PartPickerFormProps> = ({ onGenerate, isLoading }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    budget: 1500,
    currency: 'USD',
    useCase: 'Gaming',
    cpuPreference: 'No Preference',
    gpuPreference: 'No Preference',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(preferences);
  };
  
  const handlePreferenceChange = <K extends keyof UserPreferences,>(key: K, value: UserPreferences[K]) => {
     setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Budget Slider */}
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Budget: <span className="font-bold text-primary-600 dark:text-primary-400">{new Intl.NumberFormat('en-US', { style: 'currency', currency: preferences.currency, minimumFractionDigits: 0 }).format(preferences.budget)}</span>
        </label>
        <input
          type="range"
          id="budget"
          min="500"
          max="5000"
          step="50"
          value={preferences.budget}
          onChange={(e) => handlePreferenceChange('budget', parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Use Case */}
        <div>
          <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Primary Use Case
          </label>
          <select
            id="useCase"
            value={preferences.useCase}
            onChange={(e) => handlePreferenceChange('useCase', e.target.value as UserPreferences['useCase'])}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            {useCaseOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
        
        {/* Currency */}
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Currency
          </label>
          <select
            id="currency"
            value={preferences.currency}
            onChange={(e) => handlePreferenceChange('currency', e.target.value as UserPreferences['currency'])}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            {currencyOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>

        {/* CPU Preference */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">CPU Preference</label>
          <div className="mt-2 grid grid-cols-3 gap-2 rounded-lg bg-gray-200 dark:bg-gray-700 p-1">
            {cpuOptions.map(opt => (
                <button type="button" key={opt} onClick={() => handlePreferenceChange('cpuPreference', opt)} className={`whitespace-nowrap px-3 py-1 text-sm font-medium rounded-md transition-colors ${preferences.cpuPreference === opt ? 'bg-primary-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                    {opt}
                </button>
            ))}
          </div>
        </div>

        {/* GPU Preference */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">GPU Preference</label>
          <div className="mt-2 grid grid-cols-3 gap-2 rounded-lg bg-gray-200 dark:bg-gray-700 p-1">
            {gpuOptions.map(opt => (
                <button type="button" key={opt} onClick={() => handlePreferenceChange('gpuPreference', opt)} className={`whitespace-nowrap px-3 py-1 text-sm font-medium rounded-md transition-colors ${preferences.gpuPreference === opt ? 'bg-primary-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                    {opt}
                </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate Build'}
        </button>
      </div>
    </form>
  );
};
