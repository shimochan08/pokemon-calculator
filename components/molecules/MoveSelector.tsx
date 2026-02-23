"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { PokemonMove } from "@/types/dto/PokemonDTO";
import { typeMap } from "@/lib/data/typeMaps";
import { damageMap } from "@/lib/data/damageMap";

type MoveSelectorProps = {
    moves: PokemonMove[];
};

export default function MoveSelector({ moves }: MoveSelectorProps) {
    const [selected, setSelected] = useState<string[]>(["", "", "", ""]);

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (selected.includes(value)) return;

        const updated = [...selected];
        updated[index] = value;
        setSelected(updated);
    };

    const moveMap = useMemo(
        () => new Map(moves.map((m) => [m.english, m])),
        [moves]
    );

    const infoHeight = 20;

    return (
        <div
            ref={containerRef}
            style={{
                display: "flex",
                flexDirection: "column",

                flexShrink: 0,
            }}
        >
            {selected.map((value, index) => {
                const move = value ? moveMap.get(value) : null;

                return (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #374151",
                            padding: 4,
                            display: "flex",
                            gap: 4,
                            alignItems: "center",
                        }}
                    >
                        {/* 左：固定200px */}
                        <div
                            style={{
                                width: "200px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                            }}
                        >
                            <select
                                value={value}
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                                style={{
                                    fontSize: 14,
                                    padding: "4px 8px",
                                    border: "1px solid #374151",
                                }}
                            >
                                <option value="">技を選択</option>
                                {moves.map((move) => (
                                    <option
                                        key={move.english}
                                        value={move.english}
                                        disabled={selected.includes(
                                            move.english
                                        )}
                                        style={{
                                            color: selected.includes(
                                                move.english
                                            )
                                                ? "#aaa"
                                                : "#000",
                                            opacity: 1,
                                        }}
                                    >
                                        {move.japanese}
                                    </option>
                                ))}
                            </select>

                            <div
                                style={{
                                    fontSize: 14,
                                    minHeight: infoHeight,
                                    textAlign: "center",
                                }}
                            >
                                {move ? (
                                    <>
                                        {(() => {
                                            const typeName =
                                                typeMap.find((t) => t.english === move.type)?.japanese ?? "-";

                                            const damageLabel = damageMap[move.damageClass] ?? null;

                                            if (!damageLabel) return <>-</>;

                                            return (
                                                <div style={{ fontSize: 12, textAlign: "center" }}>
                                                    {typeName}, {damageLabel} {move.damageClass !== "status" && ` ${move.power ?? "-"}`}, {move.accuracy ? `命中${move.accuracy}%` : "-"}
                                                </div>
                                            );
                                        })()}
                                    </>
                                ) : (
                                    <>&nbsp;</>
                                )}
                            </div>
                        </div>

                        {/* 右：フレーバー（幅で判定） */}
                        {move?.flavorText && containerWidth > 300 && (
                            <div
                                style={{
                                    flex: 1,
                                    fontSize: 12,
                                    color: "#9ca3af",
                                    minWidth: 0,
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "normal",
                                }}
                            >
                                {move.flavorText.replace(/\s+/g, " ").trim()}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}