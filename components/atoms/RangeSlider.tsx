'use client';

type Props = {
  value: number;
  onChange: (v: number) => void;
};

export default function RangeSlider({ value, onChange }: Props) {
  return (
    <input
      type="range"
      value={value}
      min={0}
      max={252}
      step={4}
      onChange={(e) => onChange(Number(e.target.value))}
      className="rangeSlider"
    />
  );
}
