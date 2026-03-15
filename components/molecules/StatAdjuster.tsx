"use client";

import { PokemonStat } from "@/types/dto/PokemonDTO";
import StatRow from "../atoms/StatRow";

type StatAdjusterProps = {
    stats: PokemonStat[];
    ivs: Record<string, number>;
    evs: Record<string, number>;
    onChange: (newIvs: Record<string, number>, newEvs: Record<string, number>) => void;
};

export default function StatAdjuster({ stats, ivs, evs, onChange }: StatAdjusterProps) {
    const totalEv = Object.values(evs).reduce((sum, v) => sum + (v ?? 0), 0);
    const remainingEv = 510 - totalEv;

    return (
        <div style={{ width: "500px", flexShrink: 0, gap: 4 }}>
            {stats.map((s) => (
                <StatRow
                    key={s.name}
                    name={s.name}
                    base={s.baseStat}
                    iv={ivs[s.name] ?? 31}
                    ev={evs[s.name] ?? 0}
                    totalEv={totalEv}
                    remainingEv={remainingEv}
                    onIvChange={(v) => {
                        const nextIvs = { ...ivs, [s.name]: v };
                        onChange(nextIvs, evs);
                    }}
                    onEvChange={(name, oldEv, newEv) => {
                        const roundedNewEv = Math.floor(newEv / 4) * 4;
                        const newTotal = totalEv - (evs[name] ?? 0) + roundedNewEv;
                        if (newTotal > 510) return;

                        const nextEvs = { ...evs, [name]: roundedNewEv };
                        onChange(ivs, nextEvs);
                    }}
                />
            ))}
            <div style={{ margin: 16 }} />
            <div style={{ marginBottom: 4, textAlign: "center" }}>
                残り努力値: {remainingEv}
            </div>
        </div>
    );
}
