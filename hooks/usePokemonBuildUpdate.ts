"use client";

import { PokemonBuild } from "@/types/domain/PokemonBuild";
import { pokemonBuildLocalStorage } from "@/repositories/localStrage/pokemonBuildLocalStorage";

export function usePokemonBuildUpdate() {

    const updateBuild = async (build: PokemonBuild) => {

        await pokemonBuildLocalStorage.save(build);

    };

    return { updateBuild };
}