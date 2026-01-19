export function calculateStat({
    base,
    iv,
    ev,
    level,
    isHp,
}: {
    base: number;
    iv: number;
    ev: number;
    level: number;
    isHp: boolean;
}) {
    if (isHp) {
        return Math.floor(((2 * base + iv + ev / 4) * level) / 100) + level + 10;
    }
    return Math.floor(((2 * base + iv + ev / 4) * level) / 100) + 5;
}
