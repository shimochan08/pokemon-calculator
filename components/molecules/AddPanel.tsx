'use client';

import { FaPlus } from 'react-icons/fa';
import { Panel, PanelSize } from '@/types/domain/Panel';

type AddPanelProps = {
  panel: Panel;
  panelIndex: number;
  onOpen: (panelIndex: number, size: PanelSize) => void;
};

export default function AddPanel({ panel, panelIndex, onOpen }: AddPanelProps) {
  return (
    <div className="addPanelContainer">
      <button onClick={() => onOpen(panelIndex, panel.size)} className="circle">
        <FaPlus className="addPanelIcon" />
      </button>
    </div>
  );
}
