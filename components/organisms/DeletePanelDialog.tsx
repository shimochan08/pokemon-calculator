'use client';

import { useEffect, useRef } from 'react';
import '@/styles/item.css';
import { PanelSize } from '@/types/domain/Panel';

type DeletePanelDialogProps = {
  open: boolean;
  deleteTargetTitle: string;
  deleteTargetSize: PanelSize;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeletePanelDialog({
  open,
  deleteTargetSize,
  deleteTargetTitle,
  onCancel,
  onConfirm,
}: DeletePanelDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={ref} className="appDialog" onCancel={onCancel}>
      <div className="appDialogContent">
        <h3 className="appDialogTitle">パネルを削除しますか？</h3>

        <div className="appDialogInfo">
          <div className="appDialogRow">
            <span className="appDialogLabel">パネル : </span>
            <span className="appDialogValue">{deleteTargetTitle.toUpperCase() || 'Untitled'}</span>
          </div>

          <div className="appDialogRow">
            <span className="appDialogLabel">サイズ : </span>
            <span className="appDialogValue">{deleteTargetSize?.toUpperCase() || 'Unknown'}</span>
          </div>
        </div>

        <div className="appDialogActions">
          <button className="appDialogButton appDialogButton--secondary" onClick={onCancel}>
            キャンセル
          </button>
          <button className="appDialogButton appDialogButton--primary" onClick={onConfirm}>
            削除
          </button>
        </div>
      </div>
    </dialog>
  );
}
