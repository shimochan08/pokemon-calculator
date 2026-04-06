'use client';

import { PokemonStat } from '@/types/domain/PokeApiData';
import StatRow from '../atoms/StatRow';
import { NatureSelector } from './NatureSelector';
import { NATURE_MULTIPLIERS, StatKey } from '@/types/domain/PokemonBuild';

type StatAdjusterProps = {
  stats: PokemonStat[];
  ivs: Record<string, number>;
  evs: Record<string, number>;
  nature: string;
  onChange: (newIvs: Record<string, number>, newEvs: Record<string, number>, newNature: string) => void;
};

export default function StatAdjuster({ stats, ivs, evs, nature, onChange }: StatAdjusterProps) {
  const totalEv = Object.values(evs).reduce((sum, v) => sum + (v ?? 0), 0);
  const remainingEv = 510 - totalEv;

  return (
    <div className="statAdjuster">
      {stats.map((s) => (
        <StatRow
          key={s.name}
          name={s.name}
          base={s.baseStat}
          iv={ivs[s.name] ?? 31}
          ev={evs[s.name] ?? 0}
          remainingEv={remainingEv}
          natureMultiplier={NATURE_MULTIPLIERS[nature]?.[s.name as StatKey] ?? 1}
          onIvChange={(v) => {
            const nextIvs = { ...ivs, [s.name]: v };
            onChange(nextIvs, evs, nature);
          }}
          onEvChange={(name, oldEv, newEv) => {
            const roundedNewEv = Math.floor(newEv / 4) * 4;
            const newTotal = totalEv - (evs[name] ?? 0) + roundedNewEv;
            if (newTotal > 510) return;

            const nextEvs = { ...evs, [name]: roundedNewEv };
            onChange(ivs, nextEvs, nature);
          }}
        />
      ))}
      <div className="statAdjusterSpacer" />
      <div className="statAdjusterFooter">
        <div>性格: </div>
        <NatureSelector nature={nature} onChange={(newNature) => onChange(ivs, evs, newNature)} />
        <div>残り努力値: {remainingEv}</div>
      </div>
    </div>
  );
}
