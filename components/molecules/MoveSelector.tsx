'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { PokemonMove } from '@/types/domain/PokeApiData';
import { typeMap } from '@/lib/data/typeMaps';
import { damageMap } from '@/lib/data/damageMap';

type MoveSelectorProps = {
  availableMoves: PokemonMove[];
  selectedMoves: string[];
  onChange: (newSelected: string[]) => void;
};

export default function MoveSelector({ availableMoves, selectedMoves, onChange }: MoveSelectorProps) {
  const [selected, setSelected] = useState<string[]>(['', '', '', '']);

  useEffect(() => {
    setSelected([...selectedMoves, '', '', '', ''].slice(0, 4));
  }, [selectedMoves]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (selected.includes(value)) return;

    const updated = [...selected];
    updated[index] = value;
    setSelected(updated);
    onChange(updated);
  };

  const moveMap = useMemo(() => new Map(availableMoves.map((m) => [m.english, m])), [availableMoves]);

  const infoHeight = 20;

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {selected.map((value, index) => {
        const move = value ? moveMap.get(value) : null;

        return (
          <div
            key={index}
            style={{
              border: '1px solid #374151',
              padding: 4,
              display: 'flex',
              gap: 4,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '200px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <select
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                style={{
                  fontSize: 14,
                  padding: '4px 8px',
                  border: '1px solid #374151',
                }}
              >
                <option value="">技を選択</option>
                {availableMoves.map((m) => (
                  <option
                    key={m.english}
                    value={m.english}
                    disabled={selected.includes(m.english) && m.english !== value}
                    style={{
                      color: selected.includes(m.english) && m.english !== value ? '#aaa' : '#000',
                    }}
                  >
                    {m.japanese}
                  </option>
                ))}
              </select>

              <div
                style={{
                  fontSize: 14,
                  minHeight: infoHeight,
                  textAlign: 'center',
                }}
              >
                {move ? (
                  <div style={{ fontSize: 12, textAlign: 'center' }}>
                    {(() => {
                      const typeName = typeMap.find((t) => t.english === move.type)?.japanese ?? '-';
                      const damageLabel = damageMap[move.damageClass] ?? '-';
                      const power = move.power ?? '-';
                      const accuracy = move.accuracy ? `命中${move.accuracy}%` : '-';

                      return `${typeName}, ${damageLabel}${move.damageClass !== 'status' ? ` ${power}` : ''}, ${accuracy}`;
                    })()}
                  </div>
                ) : (
                  <>&nbsp;</>
                )}
              </div>
            </div>

            {move?.flavorText && containerWidth > 300 && (
              <div
                style={{
                  flex: 1,
                  fontSize: 12,
                  color: '#9ca3af',
                  minWidth: 0,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                }}
              >
                {move.flavorText.replace(/\s+/g, ' ').trim()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
