import { mapToPokemonDTO, PokemonDTO } from "@/types/dto/PokemonDTO";


export async function fetchPokemon(name: string): Promise<PokemonDTO> {
    const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );

    if (!res.ok) {
        throw new Error("取得失敗");
    }

    const data: unknown = await res.json();

    return mapToPokemonDTO(data);
}