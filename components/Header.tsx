
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { ComputerDesktopIcon } from './icons/ComputerDesktopIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <ComputerDesktopIcon className="h-8 w-8 text-primary-600 dark:text-primary-500" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI PC Part Picker
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
