import { PokemonBuild } from "@/types/domain/PokemonBuild";
import { PokemonBuildRepository } from "../PokemonBuildRepository";

const KEY = "pokemon-builds";

export const pokemonBuildLocalStorage: PokemonBuildRepository = {

    async load(buildId: string) {

        if (typeof window === "undefined") return null;

        const data = localStorage.getItem(KEY);
        if (!data) return null;

        const builds = JSON.parse(data);

        return builds[buildId] ?? null;
    },

    async save(build: PokemonBuild) {

        if (typeof window === "undefined") return;

        const data = localStorage.getItem(KEY);
        const builds = data ? JSON.parse(data) : {};

        builds[build.id] = build;

        localStorage.setItem(KEY, JSON.stringify(builds));
    }
};