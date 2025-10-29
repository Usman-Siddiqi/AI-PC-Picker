import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import type { PartListResponse, UserPreferences } from '../types';
import { PartIcon } from './PartIcon';

interface PartListProps {
  response: PartListResponse | null;
  isLoading: boolean;
  error: string | null;
  currency: UserPreferences['currency'];
}

const currencySymbols: { [key in UserPreferences['currency']]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'CA$',
};

export const PartList: React.FC<PartListProps> = ({ response, isLoading, error, currency }) => {
  const symbol = currencySymbols[currency] || '$';
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Reset image errors when a new response is received
    setImageErrors({});
  }, [response]);

  const handleImageError = (partName: string) => {
    setImageErrors(prev => ({ ...prev, [partName]: true }));
  };


  if (isLoading) {
    return <div className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <Loader />
        <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">AI is thinking...</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Crafting the perfect build for you.</p>
    </div>;
  }

  if (error) {
    return <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-2xl">
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">An Error Occurred</h3>
      <p className="mt-2 text-sm text-red-600 dark:text-red-300">{error}</p>
    </div>;
  }

  if (!response) {
    return <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Your Custom Build Awaits</h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Fill out the form above to generate your personalized PC part list.</p>
    </div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your AI-Generated Build</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{response.summary}</p>
      </div>
      
      <div className="space-y-6">
        {response.parts.map((part) => (
          <div key={part.name} className="flex items-start space-x-4">
            <div className="flex-shrink-0 h-20 w-20">
                {imageErrors[part.name] || !part.imageUrl ? (
                    <div className="h-full w-full bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center">
                        <PartIcon category={part.category} className="h-10 w-10 text-primary-600 dark:text-primary-400"/>
                    </div>
                ) : (
                    <img
                        src={part.imageUrl}
                        alt={part.name}
                        className="h-full w-full rounded-lg object-cover bg-gray-200 dark:bg-gray-700"
                        onError={() => handleImageError(part.name)}
                    />
                )}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{part.category}</p>
                        <p className="font-bold text-gray-800 dark:text-gray-100">{part.name}</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white ml-4 whitespace-nowrap">{symbol}{part.price.toFixed(2)}</p>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{part.justification}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Build Cost</p>
              <p className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
                  {symbol}{response.totalCost.toFixed(2)}
              </p>
          </div>
      </div>
    </div>
  );
};