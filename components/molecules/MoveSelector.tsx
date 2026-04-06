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

  return (
    <div ref={containerRef} className="moveSelector">
      {selected.map((value, index) => {
        const move = value ? moveMap.get(value) : null;

        return (
          <div key={index} className="moveSelectorRow">
            <div className="moveSelectorControl">
              <select
                className="moveSelectorSelect"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
              >
                <option value="">技を選択</option>
                {availableMoves.map((m) => (
                  <option
                    key={m.english}
                    value={m.english}
                    disabled={selected.includes(m.english) && m.english !== value}
                    className={
                      selected.includes(m.english)
                        ? m.english === value
                          ? 'selectorOption--selected'
                          : 'moveSelectorOption--disabled'
                        : ''
                    }
                  >
                    {m.japanese}
                  </option>
                ))}
              </select>

              <div className="moveSelectorInfo">
                {move ? (
                  <div className="moveSelectorInfoText">
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
              <div className="moveSelectorFlavor">
                {move.flavorText.replace(/\s+/g, ' ').trim()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
