import { moveMap } from '@/lib/data/moveMap';
import { translateType } from '@/lib/predict/translateType';

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

export function mapToPokeApiData(data: any): PokeApiData {
  const STAT_SHORT: Record<string, string> = {
    hp: 'hp',
    attack: 'atk',
    defense: 'def',
    'special-attack': 'spa',
    'special-defense': 'spd',
    speed: 'spe',
  };
  return {
    id: data.id,
    name: data.name,
    sprites: {
      frontDefault: data.sprites?.front_default ?? null,
      backDefault: data.sprites?.back_default ?? null,
      frontShiny: data.sprites?.front_shiny ?? null,
    },
    types: data.types.map((t: any) => translateType(t.type.name)),
    abilities: data.abilities.map((a: any) => a.ability.name),
    moves: data.moves.map((m: any) => {
      const found = moveMap.find((mv) => mv.english === m.move.name);

      return (
        found ?? {
          english: m.move.name,
          japanese: m.move.name,
          type: m.move.type.name,
          power: null,
          accuracy: null,
          damageClass: 'unknown',
          flags: [],
          flavorText: m.move.flavorText ?? '',
        }
      );
    }),
    stats:
      data.stats?.map(
        (s: any): PokemonStat => ({
          name: STAT_SHORT[s.stat?.name ?? ''] ?? s.stat?.name ?? '',
          baseStat: s.base_stat ?? 0,
        }),
      ) ?? [],
  };
}
