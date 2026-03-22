"use client";

import { useEffect, useState } from "react";
import { Panel } from "@/types/domain/Panel";
import { NATURE_MULTIPLIERS, PokemonBuild, StatKey } from "@/types/domain/PokemonBuild";
import SearchBar from "../atoms/SearchItem";
import { pokemonMap } from "@/lib/data/pokemonMap";
import { usePokemon } from "@/hooks/usePokemonData";
import NumberInput from "../atoms/NumberInput";
import { moveMap } from "@/lib/data/moveMap";
import { simpleStatMap } from "@/lib/data/statLabel";
import { enToJpTypeMap, getTypeEffectiveness } from "@/lib/data/typeMaps";

type AtkDamageCalculatePanelProps = {
    panel: Panel;
    setPanelItems: React.Dispatch<React.SetStateAction<(Panel | null)[]>>;
    pokemonBuild: PokemonBuild;
};

export default function AtkDamageCalculatePanel({
    pokemonBuild,
}: AtkDamageCalculatePanelProps) {

    const atkName = pokemonBuild.name && pokemonBuild.name !== ""
        ? pokemonBuild.name
        : "pikachu";
    const [pokemonName, setPokemonName] = useState("pikachu");

    const { pokemon: atkPokemon } = usePokemon(atkName);
    const { pokemon: defPokemon } = usePokemon(pokemonName);

    useEffect(() => {
        console.log("atkPokemon", atkPokemon);
        console.log("defPokemon", defPokemon);
    }, [atkPokemon, defPokemon]);

    // ===== 防御側 =====
    const [defEVs, setDefEVs] = useState({ hp: 0, def: 0, spd: 0 });
    const [defIVs, setDefIVs] = useState({ hp: 31, def: 31, spd: 31 });
    const [defNatures, setDefNatures] = useState({ hp: 1, def: 1, spd: 1 });

    const [defRanks, setDefRanks] = useState({ def: 0, spd: 0 });
    const [defMul1, setDefMul1] = useState({ def: 1, spd: 1 });
    const [defMul2, setDefMul2] = useState({ def: 1, spd: 1 });

    // ===== 攻撃側倍率 =====
    const [atkRanks, setAtkRanks] = useState({ atk: 0, spa: 0 });
    const [atkMul1, setAtkMul1] = useState({ atk: 1, spa: 1 });
    const [atkMul2, setAtkMul2] = useState({ atk: 1, spa: 1 });

    const getAtkStat = (type: "atk" | "spa") => {
        if (!atkPokemon) return 0;

        const base =
            atkPokemon.stats.find((s) => s.name === type)?.baseStat || 0;

        const iv = pokemonBuild.ivs[type];
        const ev = pokemonBuild.evs[type];
        const nature = NATURE_MULTIPLIERS[pokemonBuild.nature]?.[type] ?? 1;

        return Math.floor((((base * 2 + iv + ev / 4) * 50) / 100 + 5) * nature);
    };

    // ===== 計算 =====
    const rankMul = (rank: number) =>
        rank >= 0 ? (2 + rank) / 2 : 2 / (2 - rank);

    const calcHP = (base: number, iv: number, ev: number) =>
        Math.floor(((base * 2 + iv + ev / 4) * 50) / 100 + 60);

    const calcStat = (
        base: number,
        iv: number,
        ev: number,
        nature: number
    ) =>
        Math.floor((((base * 2 + iv + ev / 4) * 50) / 100 + 5) * nature);

    const calculateDamage = (move: any) => {
        if (!move || !atkPokemon || !defPokemon) {
            return { min: 0, max: 0 };
        }

        if (move.damageClass === "status" || !move.power) {
            return { min: 0, max: 0 };
        }

        const level = 50;

        const isPhysical = move.damageClass === "physical";

        const atkType = isPhysical ? "atk" : "spa";
        const defType = isPhysical ? "def" : "spd";

        // ===== 攻撃実数値 =====
        const atkReal = getAtkStat(atkType);

        const atkStat =
            atkReal *
            rankMul(atkRanks[atkType]) *
            atkMul1[atkType] *
            atkMul2[atkType];

        // ===== 防御実数値 =====
        const defBase =
            defPokemon.stats.find((s) => s.name === defType)?.baseStat || 50;

        const defStat =
            calcStat(
                defBase,
                defIVs[defType],
                defEVs[defType],
                defNatures[defType]
            ) *
            rankMul(defRanks[defType]) *
            defMul1[defType] *
            defMul2[defType];

        const hpBase = defPokemon.stats.find(s => s.name === "hp")?.baseStat || 0;

        const hp = calcHP(hpBase, defIVs.hp, defEVs.hp);
        // ===== 基本ダメージ =====
        const A = Math.floor((2 * level) / 5 + 2);

        const B = Math.floor(
            (A * move.power * atkStat) / defStat
        );

        const C = Math.floor(B / 50);

        const baseDamage = Math.floor(B / 50) + 2;

        // ===== STAB（タイプ一致）=====
        const stab = atkPokemon.types.includes(enToJpTypeMap[move.type])
            ? 1.5
            : 1.0;
        // ===== タイプ相性 =====
        const typeEffectiveness = getTypeEffectiveness(move.type, defPokemon.types);

        // ===== 急所（今は固定OFF）=====
        const critical = 1.0; // ←あとで1.5にできる

        // ===== その他補正 =====
        const modifier = stab * typeEffectiveness * critical;

        // ===== 乱数（16段階）=====
        const rolls = Array.from({ length: 16 }, (_, i) => 0.85 + i * 0.01);
        const damages = rolls.map(r =>
            Math.floor(
                Math.floor(baseDamage * r) * modifier
            )
        );
        console.log("calculateDamage", { baseDamage, modifier, damages, typeEffectiveness });
        const min = Math.min(...damages);
        const max = Math.max(...damages);

        const minPct = (min / hp) * 100;
        const maxPct = (max / hp) * 100;

        return { min, max, minPct: Number(minPct.toFixed(1)), maxPct: Number(maxPct.toFixed(1)) };
    };

    const moves = pokemonBuild.moves
        .map((m) => moveMap.find((mv) => mv.english === m))
        .slice(0, 4);

    return (
        <div
            style={{
                background: "var(--panel-background)",
                color: "white",
                height: "var(--height)",
                minWidth: "1000px",
                padding: 16,
                borderRadius: 8,
                display: "grid",
                gridTemplateColumns: "1fr 2fr 2fr",
                gap: 12,
            }}
        >
            {/* ===== 攻撃側 ===== */}
            <div
                style={{
                    border: "1px solid #ce6464",
                    borderRadius: 6,
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                }}
            >
                <div style={{ height: 43 }} />
                {/* ヘッダー */}
                {atkPokemon && (() => {
                    const atk = getAtkStat("atk");
                    const spa = getAtkStat("spa");

                    return (
                        <div style={{ borderBottom: "1px solid #333", paddingBottom: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                {atkPokemon.sprites.frontDefault && (
                                    <img
                                        src={atkPokemon.sprites.frontDefault}
                                        style={{ width: 56, height: 56 }}
                                    />
                                )}

                                <div>
                                    <div style={{ fontWeight: 600 }}>
                                        {atkPokemon.name}
                                    </div>
                                    <div style={{ fontSize: 12 }}>
                                        A:{atk} / C:{spa}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* ヘッダー行 */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "40px 1fr 1fr 1fr",
                        fontSize: 12,
                        opacity: 0.7,
                    }}
                >
                    <div></div>
                    <div>ランク</div>
                    <div>倍率1</div>
                    <div>倍率2</div>
                </div>

                {/* 行 */}
                {(["atk", "spa"] as const).map((key) => (
                    <div
                        key={key}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "40px 1fr 1fr 1fr",
                            gap: 4,
                            alignItems: "center",
                        }}
                    >
                        <div style={{ fontWeight: 600 }}>
                            {simpleStatMap[key as StatKey]}
                        </div>

                        <NumberInput
                            value={atkRanks[key]}
                            min={-6}
                            max={6}
                            onChange={(v) =>
                                setAtkRanks((p) => ({ ...p, [key]: v }))
                            }
                        />

                        <NumberInput
                            value={atkMul1[key]}
                            min={0}
                            max={5}
                            step={0.1}
                            onChange={(v) =>
                                setAtkMul1((p) => ({ ...p, [key]: v }))
                            }
                        />

                        <NumberInput
                            value={atkMul2[key]}
                            min={0}
                            max={5}
                            step={0.1}
                            onChange={(v) =>
                                setAtkMul2((p) => ({ ...p, [key]: v }))
                            }
                        />
                    </div>
                ))}
            </div>

            {/* ===== 防御側 ===== */}
            <div
                style={{
                    border: "1px solid #6457dd",
                    borderRadius: 6,
                    padding: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                }}
            >
                <SearchBar
                    items={pokemonMap}
                    current={pokemonName}
                    onSelect={(p) => setPokemonName(p.english)}
                />

                {/* ヘッダー */}
                {defPokemon && (() => {
                    const hpBase = defPokemon.stats.find(s => s.name === "hp")?.baseStat || 0;
                    const defBase = defPokemon.stats.find(s => s.name === "def")?.baseStat || 0;
                    const spdBase = defPokemon.stats.find(s => s.name === "spd")?.baseStat || 0;

                    const hp = calcHP(hpBase, defIVs.hp, defEVs.hp);
                    const def = calcStat(defBase, defIVs.def, defEVs.def, defNatures.def);
                    const spd = calcStat(spdBase, defIVs.spd, defEVs.spd, defNatures.spd);

                    return (
                        <div style={{ borderBottom: "1px solid #333", paddingBottom: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <img src={defPokemon.sprites.frontDefault ?? ""} style={{ width: 56, height: 56 }} />
                                <div>
                                    <div style={{ fontWeight: 600 }}>{defPokemon.name}</div>
                                    <div style={{ fontSize: 12 }}>
                                        HP:{hp} / B:{def} / D:{spd}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* カラムヘッダー */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "40px repeat(6, 1fr)",
                        fontSize: 12,
                        opacity: 0.7,
                    }}
                >
                    <div></div>
                    <div>努力値</div>
                    <div>個体値</div>
                    <div>性格</div>
                    <div>ランク</div>
                    <div>倍率1</div>
                    <div>倍率2</div>
                </div>

                {(["hp", "def", "spd"] as const).map((key) => (
                    <div
                        key={key}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "40px repeat(6, 1fr)",
                            gap: 4,
                            alignItems: "center",
                        }}
                    >
                        <div style={{ fontWeight: 600 }}>{simpleStatMap[key as StatKey]}</div>

                        <NumberInput value={defEVs[key]} min={0} max={252} step={4}
                            onChange={(v) => setDefEVs(p => ({ ...p, [key]: v }))} />

                        <NumberInput value={defIVs[key]} min={0} max={31} step={1}
                            onChange={(v) => setDefIVs(p => ({ ...p, [key]: v }))} />
                        {key !== "hp" ? (
                            <>
                                <NumberInput value={defNatures[key]} min={0.9} max={1.1} step={0.1}
                                    onChange={(v) => setDefNatures(p => ({ ...p, [key]: v }))} />


                                <NumberInput value={defRanks[key]} min={-6} max={6}
                                    onChange={(v) => setDefRanks(p => ({ ...p, [key]: v }))} />

                                <NumberInput value={defMul1[key]} min={0} max={5} step={0.1}
                                    onChange={(v) => setDefMul1(p => ({ ...p, [key]: v }))} />

                                <NumberInput value={defMul2[key]} min={0} max={5} step={0.1}
                                    onChange={(v) => setDefMul2(p => ({ ...p, [key]: v }))} />
                            </>
                        ) : (
                            <>
                                <div></div><div></div><div></div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* ===== ダメージ ===== */}
            <div style={{ padding: 6 }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {moves.map((move, i) => {
                        if (!move) return null;

                        const { min, max, minPct, maxPct } = calculateDamage(move);

                        // ===== クランプ（0〜100に制限）=====
                        const clamp = (v: number, min = 0, max = 100) =>
                            Math.min(max, Math.max(min, v));

                        const safeMinPct = clamp(minPct ?? 0);
                        const safeMaxPct = clamp(maxPct ?? 0);

                        // ===== 残HP換算 =====
                        const minRemain = clamp(100 - safeMaxPct);
                        const maxRemain = clamp(100 - safeMinPct);

                        // ===== 色 =====
                        const getHpColor = (hpPct: number) => {
                            if (hpPct <= 30) return "#e74c3c";
                            if (hpPct <= 60) return "#f1c40f";
                            return "#2ecc71";
                        };

                        const solidColor = getHpColor(minRemain);
                        const lightColor = getHpColor(maxRemain);

                        return (
                            <div key={i}>
                                {/* 技名 */}
                                <div style={{ fontWeight: 600 }}>
                                    {move.japanese}
                                </div>

                                {/* ===== HPバー ===== */}
                                <div style={{
                                    height: 20,
                                    background: "#333",
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    position: "relative"
                                }}>
                                    {/* 乱数幅（薄い） */}
                                    {maxRemain > minRemain && (
                                        <div style={{
                                            position: "absolute",
                                            left: `${minRemain}%`,
                                            width: `${maxRemain - minRemain}%`,
                                            height: "100%",
                                            background: lightColor,
                                            opacity: 0.4,
                                            transition: "all 0.2s ease"
                                        }} />
                                    )}

                                    {/* 最低残りHP（濃い） */}
                                    {minRemain > 0 && (
                                        <div style={{
                                            position: "absolute",
                                            left: 0,
                                            width: `${minRemain}%`,
                                            height: "100%",
                                            background: solidColor,
                                            transition: "all 0.2s ease"
                                        }} />
                                    )}
                                </div>

                                {/* ===== ダメージ表示 ===== */}
                                <div style={{ fontSize: 12 }}>
                                    {min} ~ {max} ({safeMinPct} ~ {safeMaxPct}%)
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}