"use client";

import { useState } from "react";
import StatRow from "../molecules/StatRow";

type Stat = {
    base_stat: number;
    stat: { name: string };
};

export default function StatAdjuster({ stats }: { stats: Stat[] }) {
    const [ivs, setIvs] = useState<Record<string, number>>({});
    const [evs, setEvs] = useState<Record<string, number>>({});

    return (
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
            {stats.map((s) => {
                const name = s.stat.name;
                return (
                    <StatRow
                        key={name}
                        name={name}
                        base={s.base_stat}
                        iv={ivs[name] ?? 31}
                        ev={evs[name] ?? 0}
                        onIvChange={(v) => setIvs({ ...ivs, [name]: v })}
                        onEvChange={(v) => setEvs({ ...evs, [name]: v })}
                    />
                );
            })}
        </div>
    );
}
