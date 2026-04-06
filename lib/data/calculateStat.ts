export type CalculateStatParams = {
  base: number;
  iv: number;
  ev: number;
  level: number;
  isHp: boolean;
};

export function calculateStat({ base, iv, ev, level, isHp }: CalculateStatParams) {
  const effortPoints = Math.floor(ev / 4);
  const scaled = Math.floor(((2 * base + iv + effortPoints) * level) / 100);

  if (isHp) {
    return scaled + level + 10;
  }

  return scaled + 5;
}

export function calculateActualStat({
  natureMultiplier = 1,
  ...params
}: CalculateStatParams & { natureMultiplier?: number }) {
  const rawStat = calculateStat(params);

  if (params.isHp) {
    return rawStat;
  }

  return Math.floor(rawStat * natureMultiplier);
}
