"use client";

import { useState, useEffect } from "react";
import { columns, rebuildLayout } from "@/utils/layout";
import PokemonCalculate from "../organisms/PokemonCalculate";
import { getColSpan, Panel, PanelSize } from "@/types/domain/Panel";
import RootPanel from "../organisms/RootPanel";

export default function Dashboard() {
    // アイテムをただ管理するstate
    const [items, setItems] = useState<Panel[]>([]);
    // レイアウトされた行を管理するstate(rebuildLayoutにより生成)
    const [rows, setRows] = useState<Panel[][]>([]);

    useEffect(() => {
        setRows(rebuildLayout(items));
    }, [items]);

    function handleSubmit(
        panelIndex: number,
        size: PanelSize,
        componentKey: string,
        panelSize: PanelSize
    ) {
        setItems(prev => {
            const newItems = [...prev];

            if (panelSize === "none") {
                newItems.push({
                    id: crypto.randomUUID(),
                    title: "",
                    size,
                    componentKey,
                });

                return newItems;
            }

            const exists = newItems[panelIndex];

            if (exists) {
                newItems[panelIndex] = {
                    ...exists,
                    size,
                    componentKey,
                };
            }

            return newItems;
        });
    }
    return (
        <div style={{ padding: 20 }}>
            <PokemonCalculate />
            {rows.map((row, rowIndex) => (

                <div
                    key={rowIndex}
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: 16,
                        marginBottom: 16
                    }}
                >

                    {row.map((panel, panelIndex) => {

                        return (
                            <div
                                key={panel.id}
                                style={{
                                    gridColumn: `span ${getColSpan(panel.size)}`,
                                }}
                            >
                                <RootPanel panel={panel} panelIndex={panelIndex} onSubmit={handleSubmit} />
                            </div>
                        );
                    })}

                </div>
            ))}
        </div>
    );
}