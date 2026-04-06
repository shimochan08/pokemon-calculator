'use client';

import { useEffect, useState } from 'react';
import { Panel } from '@/types/domain/Panel';
import { TiDelete } from 'react-icons/ti';

type SamplePanelProps = {
  panel: Panel;
  setPanelItems: React.Dispatch<React.SetStateAction<(Panel | null)[]>>;
};

export default function SamplePanel({ panel, setPanelItems }: SamplePanelProps) {
  const [time, setTime] = useState(new Date());
  const [records, setRecords] = useState<string[]>(panel.settings?.records ?? []);
  const maxRecords = 5;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPanelItems((prev) =>
      prev.map((p) => {
        if (p?.id === panel.id) {
          return {
            ...p,
            settings: {
              ...p.settings,
              records,
            },
          };
        }
        return p;
      }),
    );
  }, [records]);

  const formatTime = (date: Date) => {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const addRecord = () => {
    if (records.length >= maxRecords) return;
    const current = formatTime(new Date());
    if (records.includes(current) || records.length >= maxRecords) return;
    setRecords((prev) => [current, ...prev]);
  };

  const removeRecord = (index: number) => {
    setRecords((prev) => prev.filter((_, i) => i !== index));
  };

  const displayRecords = Array.from({ length: maxRecords }, (_, i) => records[i] || null);

  return (
    <div className="organism-panel clockPanel">
      <div className="clockPanelTime">{formatTime(time)}</div>

      <div className="clockPanelBody">
        <button
          className={`clockPanelRecordButton ${records.length >= maxRecords ? 'clockPanelRecordButton--disabled' : ''}`}
          onClick={addRecord}
          disabled={records.length >= maxRecords}
          onMouseDown={(e) => {
            if (records.length < maxRecords) e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          記録
        </button>

        <div className="clockPanelRecords">
          {displayRecords.map((t, i) => (
            <div key={i} className={`clockPanelRecordItem ${!t ? 'clockPanelRecordItem--empty' : ''}`}>
              <span>{t || ''}</span>
              {t && (
                <button className="clockPanelDeleteButton" onClick={() => removeRecord(i)}>
                  <TiDelete size={20} className="clockPanelDeleteIcon" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
