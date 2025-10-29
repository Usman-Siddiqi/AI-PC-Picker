
import React from 'react';
import { CpuChipIcon } from './icons/CpuChipIcon';
import { GpuChipIcon } from './icons/GpuChipIcon';
import { MotherboardIcon } from './icons/MotherboardIcon';
import { RamIcon } from './icons/RamIcon';
import { StorageIcon } from './icons/StorageIcon';
import { CaseIcon } from './icons/CaseIcon';
import { PowerIcon } from './icons/PowerIcon';
import { UnknownPartIcon } from './icons/UnknownPartIcon';

interface PartIconProps {
  category: string;
  className?: string;
}

export const PartIcon: React.FC<PartIconProps> = ({ category, className }) => {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory.includes('cpu') || normalizedCategory.includes('processor')) {
    return <CpuChipIcon className={className} />;
  }
  if (normalizedCategory.includes('gpu') || normalizedCategory.includes('video card') || normalizedCategory.includes('graphics card')) {
    return <GpuChipIcon className={className} />;
  }
  if (normalizedCategory.includes('motherboard')) {
    return <MotherboardIcon className={className} />;
  }
  if (normalizedCategory.includes('memory') || normalizedCategory.includes('ram')) {
    return <RamIcon className={className} />;
  }
  if (normalizedCategory.includes('storage') || normalizedCategory.includes('ssd') || normalizedCategory.includes('hdd')) {
    return <StorageIcon className={className} />;
  }
  if (normalizedCategory.includes('case') || normalizedCategory.includes('chassis')) {
    return <CaseIcon className={className} />;
  }
  if (normalizedCategory.includes('power supply') || normalizedCategory.includes('psu')) {
    return <PowerIcon className={className} />;
  }

  return <UnknownPartIcon className={className} />;
};
