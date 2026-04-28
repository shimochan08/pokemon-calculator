'use client';

import { CircularProgress } from '@mui/material';

type PanelLoadingProps = {
  className?: string;
  onClick?: () => void;
};

export default function PanelLoading({ className = 'panel pokemonCalculatePanelState', onClick }: PanelLoadingProps) {
  return (
    <div className={className} onClick={onClick}>
      <CircularProgress enableTrackSlot size="3rem" />
    </div>
  );
}
