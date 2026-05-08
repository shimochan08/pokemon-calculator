export interface PokeApiData {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: string[];
  abilities: string[];
  moves: PokemonMove[];
  stats: PokemonStat[];
}

export interface PokemonMove {
  english: string;
  japanese: string;
  type: string;
  power: number | null;
  accuracy: number | null;
  damageClass: DamageClassType;
  flavorText: string;
}

interface PokemonSprites {
  frontDefault: string | null;
  backDefault?: string | null;
  frontShiny?: string | null;
}

export interface PokemonStat {
  name: string;
  baseStat: number;
}

export type DamageClassType = 'physical' | 'special' | 'status' | 'unknown';

function normalizeDamageClass(value: unknown): DamageClassType {
  if (value === 'physical' || value === 'special' || value === 'status') {
    return value;
  }

  return 'unknown';
}

export function mapToPokeApiData(data: any): PokeApiData {
  return {
    id: Number(data?.id ?? 0),
    name: String(data?.name ?? ''),
    sprites: {
      frontDefault: data?.sprites?.frontDefault ?? null,
      backDefault: data?.sprites?.backDefault ?? null,
      frontShiny: data?.sprites?.frontShiny ?? null,
    },
    types: Array.isArray(data?.types) ? data.types.map((type: unknown) => String(type)) : [],
    abilities: Array.isArray(data?.abilities) ? data.abilities.map((ability: unknown) => String(ability)) : [],
    moves: Array.isArray(data?.moves)
      ? data.moves.map((move: any): PokemonMove => ({
          english: String(move?.english ?? ''),
          japanese: String(move?.japanese ?? ''),
          type: String(move?.type ?? ''),
          power: move?.power ?? null,
          accuracy: move?.accuracy ?? null,
          damageClass: normalizeDamageClass(move?.damageClass),
          flavorText: String(move?.flavorText ?? ''),
        }))
      : [],
    stats: Array.isArray(data?.stats)
      ? data.stats.map(
          (stat: any): PokemonStat => ({
            name: String(stat?.name ?? ''),
            baseStat: Number(stat?.baseStat ?? 0),
          }),
        )
      : [],
  };
}
