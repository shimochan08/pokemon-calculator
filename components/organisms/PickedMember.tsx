"use client";

import { useEffect, useState } from "react";
import { PokemonDTO } from "@/types/dto/PokemonDTO";
import { StatKey } from "@/types/domain/PokemonBuild";
import { fetchPokemon } from "@/api/pokemonApi";
import { useRouter } from "next/navigation"
import "@/styles/home.css";
import { pokemonMap } from "@/lib/data/pokemonMap";
import { abilityMap } from "@/lib/data/abilityMap";
import { itemMap } from "@/lib/data/itemMap";
import { natureMap } from "@/lib/data/natureMap";
import { typeMap } from "@/lib/data/typeMaps";
import { simpleStatMap } from "@/lib/data/statLabel";
import { moveMap } from "@/lib/data/moveMap";


type PickedMemberProps = {
    slotId: number;
    name?: string;
    dex?: number;
    ability?: string;
    item?: string;
    moves?: string[];
    nature?: string;
    ivs?: Record<StatKey, number>;
    evs?: Record<StatKey, number>;
};

export default function PickedMember({
    slotId,
    name,
    dex,
    ability,
    item,
    moves,
    nature,
    ivs,
    evs,
}: PickedMemberProps) {
    const router = useRouter();
    const [pokemon, setPokemon] = useState<PokemonDTO | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!name) return;

        setLoading(true);
        setError(null);

        fetchPokemon(name)
            .then(data => setPokemon(data))
            .catch(() => setError("取得失敗"))
            .finally(() => setLoading(false));
    }, [name]);

    const handleClick = () => {
        router.push(`/dashboard/${slotId + 1}`);
    };

    if (!name) return <div className="member-card" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handleClick}>ポケモンが選択されていません</div>;
    if (loading) return <div className="member-card" onClick={handleClick}>Loading...</div>;
    if (error) return <div className="member-card" onClick={handleClick}>{error}</div>;


    const pokemonNameText = pokemonMap.find(
        (t) => t.english === name
    )?.japanese;
    const pokemonTypesText = pokemon?.types?.map(type => {
        const typeInfo = typeMap.find(t => t.english === type);
        return typeInfo?.japanese ?? type;
    });
    const pokemonAbilityText = abilityMap.find(
        (t) => t.english === ability
    )?.japanese;
    const pokemonItemText = itemMap.find(
        (t) => t.english === item
    )?.japanese;
    const pokemonNatureText = natureMap.find(
        (t) => t.english === nature
    )?.japanese;
    const pokemonMovesText = moves?.map(move => {
        const moveInfo = moveMap.find(t => t.english === move);
        return moveInfo?.japanese ?? move;
    });

    return (
        <div className="member-card" onClick={handleClick}>
            <MemberInfo
                pokemonNameText={pokemonNameText}
                pokemonTypesText={pokemonTypesText}
                pokemonAbilityText={pokemonAbilityText}
                pokemonItemText={pokemonItemText}
                pokemonNatureText={pokemonNatureText}
                evs={evs}
                pokemonMovesText={pokemonMovesText}
            />
            {pokemon?.sprites.frontDefault && (
                <div className="member-pokemon">
                    <img
                        src={pokemon.sprites.frontDefault}
                        alt={pokemon.name}
                        className="member-sprite"
                    />
                    <div className="member-pokemon-name">
                        {pokemonNameText ?? "不明なポケモン"}
                    </div>
                    <div className="member-pokemon-types">
                        {pokemonTypesText && (
                            <span>{pokemonTypesText.join(" / ")}</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function MemberInfo({
    pokemonNameText,
    pokemonTypesText,
    pokemonAbilityText,
    pokemonItemText,
    pokemonNatureText,
    evs,
    pokemonMovesText,
}: {
    pokemonNameText?: string
    pokemonTypesText?: string[]
    pokemonAbilityText?: string
    pokemonItemText?: string
    pokemonNatureText?: string
    evs?: Record<StatKey, number>
    pokemonMovesText?: string[]
}) {
    console.log("MemberInfo", { pokemonNameText, pokemonTypesText, pokemonAbilityText, pokemonItemText, pokemonNatureText, evs });


    const formatEvs = (evs?: Record<StatKey, number>) => {
        if (!evs) return null;

        return Object.entries(evs)
            .filter(([_, value]) => value > 0)
            .map(([key, value]) => `${simpleStatMap[key as StatKey]}${value}`)
            .join(",");
    };
    const evsText = formatEvs(evs);

    return (
        <div className="member-info">
            <div className="member-pokemon-subInfo">
                <div>特性: {pokemonAbilityText ?? "未設定"}</div>
                <div>持ち物: {pokemonItemText ?? "未設定"}</div>
                <div>性格: {pokemonNatureText ?? "未設定"}</div>
                <div>努力値: {evsText ? evsText : "未設定"}</div>
            </div>
            <div className="member-moves">
                {[0, 1, 2, 3].map((i) => {
                    const move = pokemonMovesText?.[i];

                    return (
                        <div
                            key={i}
                            className={`move-box ${!move ? "empty" : ""}`}
                        >
                            {move ?? ""}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}