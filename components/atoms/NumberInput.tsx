'use client';

type Props = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
};

export default function NumberInput({ value, min, max, step = 1, onChange }: Props) {
  const clampValue = (nextValue: number) => Math.min(max, Math.max(min, nextValue));
  const normalizeValue = (rawValue: string) => {
    if (rawValue === '') return min;

    const normalized = rawValue.replace(/^0+(?=\d)/, '');
    const parsed = Number(normalized);

    if (Number.isNaN(parsed)) return min;

    return clampValue(parsed);
  };

  const handleValueCommit = (rawValue: string, syncDomValue?: (nextValue: string) => void) => {
    const normalizedValue = normalizeValue(rawValue);
    syncDomValue?.(String(normalizedValue));
    onChange(normalizedValue);
  };

  return (
    <input
      className="numberInput"
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => handleValueCommit(e.target.value, (nextValue) => (e.currentTarget.value = nextValue))}
      onBlur={(e) => handleValueCommit(e.target.value, (nextValue) => (e.currentTarget.value = nextValue))}
    />
  );
}
