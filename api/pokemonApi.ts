import { mapToPokeApiData, PokeApiData } from '@/types/domain/PokeApiData';

export async function fetchPokemon(name: string): Promise<PokeApiData> {
  const res = await fetch(`http://localhost:8080/pokedex/${name.toLowerCase()}`);

  if (!res.ok) {
    throw new Error('Error fetching Pokemon data from backend.');
  }

  const data: unknown = await res.json();

  return mapToPokeApiData(data);
}
