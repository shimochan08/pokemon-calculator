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
    <div className="organism-panel organism-panel--fill">
      <textarea
        className="memoPanelTextarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="テキストを入力可能です。"
      />
    </div>
  );
}
