import { mapToPokeApiData, PokeApiData } from "@/types/domain/PokeApiData";


export async function fetchPokemon(name: string): Promise<PokeApiData> {
    const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );

    if (!res.ok) {
        throw new Error("Error fetching Pokémon data.");
    }

    const data: unknown = await res.json();

    return mapToPokeApiData(data);
}