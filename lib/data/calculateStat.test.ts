import { calculateActualStat, calculateStat } from '@/lib/data/calculateStat';

describe('calculateStat', () => {
  it('calculates HP at level 50', () => {
    expect(
      calculateStat({
        base: 80,
        iv: 31,
        ev: 252,
        level: 50,
        isHp: true,
      }),
    ).toBe(187);
  });

  it('calculates non-HP stats before nature correction', () => {
    expect(
      calculateStat({
        base: 100,
        iv: 31,
        ev: 252,
        level: 50,
        isHp: false,
      }),
    ).toBe(152);
  });

  it('floors EV contribution in groups of four', () => {
    expect(
      calculateStat({
        base: 130,
        iv: 31,
        ev: 29,
        level: 50,
        isHp: false,
      }),
    ).toBe(
      calculateStat({
        base: 130,
        iv: 31,
        ev: 28,
        level: 50,
        isHp: false,
      }),
    );
  });
});

describe('calculateActualStat', () => {
  it('applies positive nature correction to non-HP stats', () => {
    expect(
      calculateActualStat({
        base: 100,
        iv: 31,
        ev: 252,
        level: 50,
        isHp: false,
        natureMultiplier: 1.1,
      }),
    ).toBe(167);
  });

  it('applies negative nature correction to non-HP stats', () => {
    expect(
      calculateActualStat({
        base: 100,
        iv: 31,
        ev: 252,
        level: 50,
        isHp: false,
        natureMultiplier: 0.9,
      }),
    ).toBe(136);
  });

  it('ignores nature correction for HP', () => {
    expect(
      calculateActualStat({
        base: 80,
        iv: 31,
        ev: 252,
        level: 50,
        isHp: true,
        natureMultiplier: 1.1,
      }),
    ).toBe(187);
  });
});
