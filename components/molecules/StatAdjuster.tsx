"use client";

import { useState } from "react";
import StatRow from "../atoms/StatRow";
import { PokemonStat } from "@/types/dto/PokemonDTO";

export default function StatAdjuster({ stats }: { stats: PokemonStat[] }) {
    const [ivs, setIvs] = useState<Record<string, number>>({});
    const [evs, setEvs] = useState<Record<string, number>>({});

    const totalEv = Object.values(evs).reduce(
        (sum, v) => sum + (v ?? 0),
        0
    );

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
                    onIvChange={(v) =>
                        setIvs((prev) => ({ ...prev, [s.name]: v }))
                    }
                    onEvChange={(name, oldEv, newEv) => {
                        const roundedNewEv = Math.floor(newEv / 4) * 4;

                        const newTotal = totalEv - oldEv + roundedNewEv;

                        if (newTotal > 510) return;

                        setEvs((prev) => ({
                            ...prev,
                            [name]: roundedNewEv,
                        }));
                    }}
                />
            ))}
            <div style={{ margin: 16 }} />
            <div style={{ marginBottom: 4, fontWeight: "bold", textAlign: "center" }}>
                残り努力値: {remainingEv}
            </div>
        </div>
    );
}