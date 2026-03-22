import { natureMap } from "@/lib/data/natureMap";

export type StatKey = "hp" | "atk" | "def" | "spa" | "spd" | "spe";
export const STATS: StatKey[] = ["hp", "atk", "def", "spa", "spd", "spe"];

export type PokemonBuild = {
    id: string;
    dex: number;
    name: string;
    moves: string[];
    ivs: Record<StatKey, number>;
    evs: Record<StatKey, number>;
    ability: string;
    item: string;
    nature: string;
};

export const NATURE_MULTIPLIERS: Record<string, Record<string, number>> = {};

natureMap.forEach((nature) => {
    const multipliers: Record<string, number> = {};
    STATS.forEach((stat) => {
        if (stat === nature.increasedStat) multipliers[stat] = 1.1;
        else if (stat === nature.decreasedStat) multipliers[stat] = 0.9;
        else multipliers[stat] = 1;
    });
    NATURE_MULTIPLIERS[nature.english] = multipliers;
});

export const initialBuild: PokemonBuild = {
    id: "",
    dex: 0,
    name: "",
    moves: [],
    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    ability: "",
    item: "",
    nature: "",
}; 