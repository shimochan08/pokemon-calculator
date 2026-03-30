'use client';

import { useEffect, useState } from 'react';
import { Panel } from '@/types/domain/Panel';
import { useDebounce } from '@/hooks/useDebounce';

type MemoPanelProps = {
  panel: Panel;
  setPanelItems: React.Dispatch<React.SetStateAction<(Panel | null)[]>>;
};

export default function MemoPanel({ panel, setPanelItems }: MemoPanelProps) {
  const [text, setText] = useState(panel.settings?.text || '');
  const debouncedText = useDebounce(text, 200);

  useEffect(() => {
    setPanelItems((prev) =>
      prev.map((p) => {
        if (p?.id === panel.id) {
          return {
            ...p,
            settings: {
              ...p.settings,
              text: debouncedText,
            },
          };
        }
        return p;
      }),
    );
  }, [debouncedText]);

  return (
    <div
      style={{
        background: 'var(--panel-background)',
        color: 'white',
        height: 'var(--height)',
        minWidth: 300,
        padding: 16,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        fontWeight: 600,
        fontSize: 18,
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="テキストを入力可能です。"
        style={{
          flex: 1,
          borderRadius: 4,
          border: 'none',
          padding: 8,
          fontSize: 16,
          fontWeight: 400,
          resize: 'none',
          outline: 'none',
          background: 'rgba(255, 255, 255, 0.03)',
          color: 'white',
        }}
      />
    </div>
  );
}
