"use client";

import { PokemonBuild } from "@/types/domain/PokemonBuild";

export function usePokemonBuildCreate() {

    const createBuild = (
        dex: number,
        name: string
    ): PokemonBuild => {

        return {
            id: crypto.randomUUID(),

            dex,
            name,

            moves: ["", "", "", ""],

            ivs: {
                hp: 31,
                atk: 31,
                def: 31,
                spa: 31,
                spd: 31,
                spe: 31
            },

            evs: {
                hp: 0,
                atk: 0,
                def: 0,
                spa: 0,
                spd: 0,
                spe: 0
            },

            item: "",
            ability: ""
        };

    };

    return {
        createBuild
    };

}