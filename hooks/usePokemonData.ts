import { useState, useEffect } from "react";

export function usePokemon(name: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pokemon, setPokemon] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!name) return;

        const fetchPokemon = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
                if (!res.ok) throw new Error("ポケモンが見つかりません");
                const data = await res.json();
                setPokemon(data);
            } catch (err: unknown) {
                setError((err as Error).message);
                setPokemon(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [name]);

    return { pokemon, loading, error };
}
