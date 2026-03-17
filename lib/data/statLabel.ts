import { StatKey } from "@/types/domain/PokemonBuild";

export const STAT_LABEL: Record<string, string> = {
    hp: "HP",
    atk: "こうげき",
    def: "ぼうぎょ",
    spa: "とくこう",
    spd: "とくぼう",
    spe: "すばやさ",
};
export const simpleStatMap: Record<StatKey, string> = {
    hp: "H",
    atk: "A",
    def: "B",
    spa: "C",
    spd: "D",
    spe: "S",
};