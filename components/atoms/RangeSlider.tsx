"use client";

type Props = {
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (v: number) => void;
};

export default function RangeSlider({
    value,
    min,
    max,
    step = 1,
    onChange,
}: Props) {
    return (
        <input
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(Number(e.target.value))}
        />
    );
}
