import { pokemonMap } from "../data/pokemonMap";
import { hiraToKata } from "./normalizeKana";


export function predictPokemon(input: string) {
    if (!input) return [];

    const lower = input.toLowerCase();
    const kata = hiraToKata(input);

    return pokemonMap.filter((p) => {
        return (
            p.english.startsWith(lower) ||
            p.japanese.startsWith(kata)
        );
    });
}
