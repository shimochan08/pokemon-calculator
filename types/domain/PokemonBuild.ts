export type StatKey = "hp" | "atk" | "def" | "spa" | "spd" | "spe";

export type PokemonBuild = {
    id: string;
    dex: number;
    name: string;
    moves: string[];
    ivs: Record<StatKey, number>;
    evs: Record<StatKey, number>;
    ability: string;
    item: string;
};