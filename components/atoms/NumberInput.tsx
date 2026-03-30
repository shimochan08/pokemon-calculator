'use client';

type Props = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
};

export default function NumberInput({ value, min, max, step = 1, onChange }: Props) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        width: 48,
        background: '#374151',
        color: '#fff',
        border: '1px solid #374151',
        borderRadius: 2,
        textAlign: 'right',
        fontWeight: 600,
      }}
    />
  );
}
