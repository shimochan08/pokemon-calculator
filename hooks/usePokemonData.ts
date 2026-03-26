import { fetchPokemon } from "@/api/pokemonApi";
import { PokeApiData } from "@/types/domain/PokeApiData";
import { useState, useEffect } from "react";

export function usePokemon(name: string) {
    const [pokemon, setPokemon] = useState<PokeApiData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!name) return;

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPokemon(name);
                setPokemon(data);
            } catch (err: unknown) {
                setError((err as Error).message);
                setPokemon(null);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [name]);

    return { pokemon, loading, error };
}
