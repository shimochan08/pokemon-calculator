'use client';

import { STAT_LABEL } from '@/lib/data/statLabel';
import NumberInput from './NumberInput';
import RangeSlider from './RangeSlider';
import { calculateStat } from '@/lib/data/calculateStat';

type Props = {
  name: string;
  base: number;
  iv: number;
  ev: number;
  totalEv: number;
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
  totalEv,
  remainingEv,
  natureMultiplier,
  onIvChange,
  onEvChange,
}: Props) {
  const rawStat = calculateStat({
    base,
    iv,
    ev,
    level: 50,
    isHp: name === 'hp',
  });

  const adjustedStat = Math.floor(rawStat * natureMultiplier);

  const sign = natureMultiplier > 1.001 ? '+' : natureMultiplier < 0.999 ? '−' : '';
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
