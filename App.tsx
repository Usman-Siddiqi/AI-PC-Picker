
import React, { useState } from 'react';
import { Header } from './components/Header';
import { PartPickerForm } from './components/PartPickerForm';
import { PartList } from './components/PartList';
import { generatePcParts } from './services/geminiService';
import type { UserPreferences, PartListResponse } from './types';

export default function App() {
  const [partListResponse, setPartListResponse] = useState<PartListResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCurrency, setCurrentCurrency] = useState<UserPreferences['currency']>('USD');

  const handleGenerate = async (preferences: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    setPartListResponse(null);
    setCurrentCurrency(preferences.currency);

    try {
      const result = await generatePcParts(preferences);
      setPartListResponse(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <section id="form" className="mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Build Your Dream PC</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Tell us your budget and preferences, and our AI will configure the perfect build for you.</p>
              <PartPickerForm onGenerate={handleGenerate} isLoading={isLoading} />
            </div>
          </section>

          <section id="results">
            <PartList 
              response={partListResponse}
              isLoading={isLoading}
              error={error} 
              currency={currentCurrency}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
