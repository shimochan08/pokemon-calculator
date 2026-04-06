'use client';

import { useState, useEffect } from 'react';
import { PanelSize, getColSpan } from '@/types/domain/Panel';
import { panelRegistry } from '@/utils/panelRegistry';

type AddPanelDialogProps = {
  open: boolean;
  panelIndex: number;
  baseSize: PanelSize;
  onClose: () => void;
  onSubmit: (panelIndex: number, size: PanelSize, componentKey: string, panelSize: PanelSize) => void;
};

export default function AddPanelDialog({ open, panelIndex, baseSize, onClose, onSubmit }: AddPanelDialogProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<PanelSize | null>(null);

  useEffect(() => {
    if (!open) {
      setSelectedKey(null);
      setSelectedSize(null);
    }
  }, [open]);

  if (!open) return null;

  const maxSpan = baseSize && baseSize !== 'none' ? getColSpan(baseSize) : getColSpan('l');
  const ALL_SIZES: PanelSize[] = ['s', 'm', 'l'];

  const selectablePanels = selectedSize
    ? panelRegistry.filter(
        (panel) =>
          panel.selectable !== false &&
          panel.allowedSizes.includes(selectedSize) &&
          getColSpan(selectedSize) <= maxSpan,
      )
    : [];

  const selectedPanel = selectablePanels.find((p) => p.key === selectedKey);

  const canSubmit = !!selectedSize && !!selectedKey && !!selectedPanel;

  return (
    <div className="appDialog" onClick={onClose}>
      <div className="appDialogContent appDialogContent--panelSelect" onClick={(e) => e.stopPropagation()}>
        <h3 className="appDialogTitle">追加するパネルを選択してください</h3>
        <div className="appDialogInfo appDialogInfo--scroll">
          <div className="appDialogSection">
            <p className="appDialogSectionTitle">サイズを選択してください</p>
            <div className="appDialogButtonGroup">
              {ALL_SIZES.map((size) => {
                const allowed = getColSpan(size) <= maxSpan;
                return (
                  <button
                    key={size}
                    disabled={!allowed}
                    className={`appDialogButton appDialogButton--size ${selectedSize === size ? 'appDialogButton--primary' : ''} ${!allowed ? 'appDialogButton--disabled' : ''}`}
                    onClick={() => {
                      if (!allowed) return;
                      setSelectedSize(size);
                      setSelectedKey(null);
                    }}
                  >
                    {size.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedSize && (
            <div className="appDialogSection">
              <p className="appDialogSectionTitle">パネルを選択してください</p>
              <div className="appDialogButtonGroup appDialogButtonGroup--wrap">
                {selectablePanels.map((panel) => (
                  <button
                    key={panel.key}
                    className={`appDialogButton appDialogButton--panel ${selectedKey === panel.key ? 'appDialogButton--primary' : ''}`}
                    onClick={() => setSelectedKey(panel.key)}
                  >
                    {panel.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="appDialogActions">
          <button className="appDialogButton appDialogButton--secondary" onClick={onClose}>
            キャンセル
          </button>
          <button
            className="appDialogButton appDialogButton--primary"
            disabled={!canSubmit}
            onClick={() => {
              if (!canSubmit || !selectedPanel || !selectedSize) return;
              onSubmit(panelIndex, selectedSize, selectedPanel.key, baseSize);
              onClose();
            }}
          >
            追加
          </button>
        </div>
      </div>
    </div>
  );
}
