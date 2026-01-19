"use client";

import { STAT_LABEL } from "@/lib/data/statLabel";
import NumberInput from "../atoms/NumberInput";
import RangeSlider from "../atoms/RangeSlider";
import { calculateStat } from "@/lib/data/calculateStat";


type Props = {
    name: string;
    base: number;
    iv: number;
    ev: number;
    onIvChange: (v: number) => void;
    onEvChange: (v: number) => void;
};

export default function StatRow({
    name,
    base,
    iv,
    ev,
    onIvChange,
    onEvChange,
}: Props) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "80px 60px 1fr 60px 60px",
                gap: 8,
                alignItems: "center",
                marginBottom: 10,
            }}
        >
            <strong>{STAT_LABEL[name] ?? name}</strong>

            <NumberInput value={ev} min={0} max={252} step={4} onChange={onEvChange} />
            <RangeSlider value={ev} min={0} max={252} step={4} onChange={onEvChange} />

            <NumberInput value={iv} min={0} max={31} onChange={onIvChange} />

            <div style={{ textAlign: "right" }}>
                {calculateStat({
                    base,
                    iv,
                    ev,
                    level: 50,
                    isHp: name === "hp",
                })}
            </div>
        </div>
    );
}
