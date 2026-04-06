'use client';

import { STAT_LABEL } from '@/lib/data/statLabel';
import NumberInput from './NumberInput';
import RangeSlider from './RangeSlider';
import { calculateActualStat } from '@/lib/data/calculateStat';

type Props = {
  name: string;
  base: number;
  iv: number;
  ev: number;
  remainingEv: number;
  natureMultiplier: number;
  onIvChange: (v: number) => void;
  onEvChange: (name: string, oldEv: number, newEv: number) => void;
};

export default function StatRow({
  name,
  base,
  iv,
  ev,
  remainingEv,
  natureMultiplier,
  onIvChange,
  onEvChange,
}: Props) {
  const adjustedStat = calculateActualStat({
    base,
    iv,
    ev,
    level: 50,
    isHp: name === 'hp',
    natureMultiplier,
  });

  return (
    <div className="statRow">
      {/* ステータス名 */}
      <strong>{STAT_LABEL[name] ?? name}</strong>

      {/* EV 数値入力 */}
      <NumberInput value={ev} min={0} max={ev + remainingEv} step={4} onChange={(v) => onEvChange(name, ev, v)} />

      {/* EV スライダー */}
      <RangeSlider value={ev} onChange={(v) => onEvChange(name, ev, v)} />

      {/* IV 入力 */}
      <NumberInput value={iv} min={0} max={31} onChange={onIvChange} />

      {/* 計算結果 */}
      <div className="statRowValue">
        {adjustedStat}
        {(natureMultiplier > 1.001 || natureMultiplier < 0.999) && (
          <span className="statRowNatureSign">
            {natureMultiplier > 1.001 ? '+' : '−'}
          </span>
        )}
      </div>
    </div>
  );
}
