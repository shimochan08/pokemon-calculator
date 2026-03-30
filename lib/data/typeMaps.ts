export const typeMap = [
  { english: 'normal', japanese: 'ノーマル' },
  { english: 'fire', japanese: 'ほのお' },
  { english: 'water', japanese: 'みず' },
  { english: 'electric', japanese: 'でんき' },
  { english: 'grass', japanese: 'くさ' },
  { english: 'ice', japanese: 'こおり' },
  { english: 'fighting', japanese: 'かくとう' },
  { english: 'poison', japanese: 'どく' },
  { english: 'ground', japanese: 'じめん' },
  { english: 'flying', japanese: 'ひこう' },
  { english: 'psychic', japanese: 'エスパー' },
  { english: 'bug', japanese: 'むし' },
  { english: 'rock', japanese: 'いわ' },
  { english: 'ghost', japanese: 'ゴースト' },
  { english: 'dragon', japanese: 'ドラゴン' },
  { english: 'dark', japanese: 'あく' },
  { english: 'steel', japanese: 'はがね' },
  { english: 'fairy', japanese: 'フェアリー' },
] as const;

const typeChart: Record<string, Record<string, number>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { grass: 2, ice: 2, bug: 2, steel: 2, fire: 0.5, water: 0.5, rock: 0.5, dragon: 0.5 },
  water: { fire: 2, ground: 2, rock: 2, water: 0.5, grass: 0.5, dragon: 0.5 },
  electric: { water: 2, flying: 2, electric: 0.5, grass: 0.5, dragon: 0.5, ground: 0 },
  grass: {
    water: 2,
    ground: 2,
    rock: 2,
    fire: 0.5,
    grass: 0.5,
    poison: 0.5,
    flying: 0.5,
    bug: 0.5,
    dragon: 0.5,
    steel: 0.5,
  },
  ice: { grass: 2, ground: 2, flying: 2, dragon: 2, fire: 0.5, water: 0.5, ice: 0.5, steel: 0.5 },
  fighting: {
    normal: 2,
    ice: 2,
    rock: 2,
    dark: 2,
    steel: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    fairy: 0.5,
    ghost: 0,
  },
  poison: { grass: 2, fairy: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0 },
  ground: { fire: 2, electric: 2, poison: 2, rock: 2, steel: 2, grass: 0.5, bug: 0.5, flying: 0 },
  flying: { grass: 2, fighting: 2, bug: 2, electric: 0.5, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, steel: 0.5, dark: 0 },
  bug: {
    grass: 2,
    psychic: 2,
    dark: 2,
    fire: 0.5,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    ghost: 0.5,
    steel: 0.5,
    fairy: 0.5,
  },
  rock: { fire: 2, ice: 2, flying: 2, bug: 2, fighting: 0.5, ground: 0.5, steel: 0.5 },
  ghost: { psychic: 2, ghost: 2, dark: 0.5, normal: 0 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { psychic: 2, ghost: 2, fighting: 0.5, dark: 0.5, fairy: 0.5 },
  steel: { ice: 2, rock: 2, fairy: 2, fire: 0.5, water: 0.5, electric: 0.5, steel: 0.5 },
  fairy: { fighting: 2, dragon: 2, dark: 2, fire: 0.5, poison: 0.5, steel: 0.5 },
};

export const jpToEnTypeMap: Record<string, string> = Object.fromEntries(typeMap.map((t) => [t.japanese, t.english]));
export const enToJpTypeMap: Record<string, string> = Object.fromEntries(typeMap.map((t) => [t.english, t.japanese]));

export const getTypeEffectiveness = (moveType: string, defenderTypes: string[]) => {
  return defenderTypes.reduce((multiplier, defType) => {
    const table = typeChart[moveType];

    if (!table) return multiplier;

    const defTypeEn = jpToEnTypeMap[defType] ?? defType;

    const eff = table[defTypeEn] ?? 1;

    return multiplier * eff;
  }, 1);
};
