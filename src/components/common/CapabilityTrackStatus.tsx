import React from 'react';

interface CapabilityTrackStatusProps {
  islandName?: string;
  wStatus?: 'Configured' | 'Gated' | 'Partial';
  activeFindingsCount?: number;
}

/**
 * CapabilityTrackStatus
 * Rendered null as requested to remove the M / W / E capability status strip
 * and info trigger from all operational island headers across the sidebar menu.
 */
export const CapabilityTrackStatus: React.FC<CapabilityTrackStatusProps> = () => {
  return null;
};
