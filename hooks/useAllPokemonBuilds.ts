import { useState, useEffect } from "react";
import { PokemonBuild } from "@/types/domain/PokemonBuild";
import { useDashboardSlotRead } from "@/hooks/useDashboardSlotRead";
import { pokemonBuildLocalStorage } from "@/repositories/localStrage/pokemonBuildLocalStorage";

export function useAllPokemonBuilds() {
    const { slots, loading: slotsLoading } = useDashboardSlotRead();
    const [builds, setBuilds] = useState<(PokemonBuild | null)[]>([null, null, null, null, null, null]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slotsLoading) return;

        setLoading(true);

        const loadBuilds = async () => {
            const newBuilds: (PokemonBuild | null)[] = await Promise.all(
                slots?.map(slot => (slot.buildId ? pokemonBuildLocalStorage.load(slot.buildId) : null)) ?? []
            );
            setBuilds(newBuilds);
            setLoading(false);
        };

        loadBuilds();
    }, [slots, slotsLoading]);

    return { slots, builds, loading };
}