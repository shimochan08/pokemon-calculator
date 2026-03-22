"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDashboardSlotRead } from "@/hooks/useDashboardSlotRead";
import { useDashboardSlotUpdate } from "@/hooks/useDashboardSlotUpdate";
import { columns, LayoutPanel, rebuildLayout } from "@/utils/layout";
import PokemonCalculate from "../organisms/PokemonCalculate";
import { getColSpan, Panel, PanelSize } from "@/types/domain/Panel";
import RootPanel from "../organisms/RootPanel";
import DeletePanelDialog from "../organisms/DeletePanelDialog";
import AddPanelDialog from "../organisms/AddPanelDialog";
import { mapPanelInstanceToPanel, mapPanelToInstance } from "@/lib/typeMapper/mapPanelInstanceToPanel";
import { usePokemonBuildRead } from "@/hooks/usePokemonBuildRead";
import { panelRegistry } from "@/utils/panelRegistry";
import { initialBuild, PokemonBuild } from "@/types/domain/PokemonBuild";


export type AddPanelTarget = {
    index: number;
    addPanelSize: PanelSize;
};

export type DeletePanelTarget = {
    index: number;
    deletePanelSize: PanelSize;
};

export default function Dashboard() {
    const { id } = useParams();
    const slotId = Number(id) - 1;
    const [pokemonBuild, setPokemonBuild] = useState<PokemonBuild>(initialBuild);
    const { slots, setSlots } = useDashboardSlotRead();
    const slot = slots?.[slotId];
    const buildId = slot?.buildId ?? null;

    const { build } = usePokemonBuildRead(buildId);

    const { updateSlotPanels } = useDashboardSlotUpdate(
        slots,
        setSlots
    );
    const [initialized, setInitialized] = useState(false);
    // アイテムをただ管理するstate
    const [items, setItems] = useState<(Panel | null)[]>([]);
    // レイアウトされた行を管理するstate(rebuildLayoutにより生成)
    const [rows, setRows] = useState<LayoutPanel[][]>([]);
    const [deletePanelTarget, setDeletePanelTarget] = useState<DeletePanelTarget | null>(null);
    const [addPanelTarget, setAddPanelTarget] = useState<AddPanelTarget | null>(null);

    useEffect(() => {
        let lastValidIndex = items.length - 1;
        while (lastValidIndex >= 0 && items[lastValidIndex] === null) {
            lastValidIndex--;
        }
        const trimmed =
            lastValidIndex < 0 ? [] : items.slice(0, lastValidIndex + 1);
        if (trimmed.length !== items.length) {
            setItems(trimmed);
            return;
        }
        setRows(rebuildLayout(items));
    }, [items]);

    useEffect(() => {
        if (!slots?.length) return;
        if (initialized) return;

        const slot = slots[slotId];
        if (!slot) return;

        const uiPanels = slot.panels?.map(mapPanelInstanceToPanel) ?? [];

        setItems(uiPanels);
        setInitialized(true);

    }, [slots, slotId, initialized]);

    useEffect(() => {

        if (!slots?.length) return;

        const slot = slots[slotId];
        if (!slot) return;

        if (!slot.buildId) {

            const buildId = crypto.randomUUID();

            const next = [...slots];
            next[slotId] = {
                ...slot,
                buildId
            };

            setSlots(next);
        }

    }, [slots, slotId]);

    useEffect(() => {

        if (!slots?.length) return;

        const panels = items
            .map(mapPanelToInstance);

        updateSlotPanels(slotId, panels);

    }, [items, slotId]);

    function handleSubmit(
        panelIndex: number,
        size: PanelSize,
        componentKey: string,
        panelSize: PanelSize
    ) {
        setItems(prev => {
            const newItems = [...prev];
            const span = getColSpan(size);

            const newPanel = {
                id: crypto.randomUUID(),
                title: panelRegistry.find(p => p.key === componentKey)?.label ?? "",
                size,
                componentKey,
            };

            if (panelSize === "none") {
                newItems.push(newPanel);
                return newItems;
            }

            if (newItems[panelIndex] === null) {
                newItems[panelIndex] = newPanel;
                let consumed = 1;
                let cursor = panelIndex + 1;
                while (consumed < span && cursor < newItems.length) {
                    if (newItems[cursor] === null) {
                        newItems.splice(cursor, 1);
                        consumed++;
                    } else {
                        cursor++;
                    }
                }

                return newItems;
            }

            newItems.splice(panelIndex, 0, newPanel);
            return newItems;
        });
    }

    function handleOpenAddPanel(index: number, size: PanelSize) {
        setAddPanelTarget({ index, addPanelSize: size });
    }

    function handleDeleteClick(index: number, size: PanelSize) {
        setDeletePanelTarget({ index, deletePanelSize: size });
    }

    function confirmDelete() {
        if (deletePanelTarget === null) return;
        setItems(prev => {
            const next = [...prev];
            const { index, deletePanelSize } = deletePanelTarget;
            next.splice(index, 1);
            const span = getColSpan(deletePanelSize);
            const nulls = Array(span).fill(null);
            next.splice(index, 0, ...nulls);
            return next;
        });
        setDeletePanelTarget(null);
    }
    return (
        <div style={{ padding: 20 }}>
            <PokemonCalculate build={build} buildId={buildId} setPokemonBuild={setPokemonBuild} />
            {rows.map((row, rowIndex) => (

                <div
                    key={rowIndex}
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        columnGap: 16,
                        rowGap: 0
                    }}
                >

                    {row.map((panel) => {

                        return (
                            <div
                                key={panel.id}
                                style={{
                                    gridColumn: `span ${getColSpan(panel.size)}`,
                                }}
                            >
                                <RootPanel panel={panel} panelIndex={panel.originalIndex} onOpenAddPanel={handleOpenAddPanel} onDelete={handleDeleteClick} panelItems={items} setPanelItems={setItems} pokemonBuild={pokemonBuild} />
                            </div>
                        );
                    })}

                </div>
            ))}
            <DeletePanelDialog
                open={deletePanelTarget !== null}
                deleteTargetTitle={deletePanelTarget !== null ? items[deletePanelTarget.index]?.title ?? "" : ""}
                deleteTargetSize={deletePanelTarget !== null ? items[deletePanelTarget.index]?.size ?? "none" : "none"}
                onCancel={() => setDeletePanelTarget(null)}
                onConfirm={confirmDelete}
            />
            <AddPanelDialog
                open={addPanelTarget !== null}
                panelIndex={addPanelTarget?.index ?? 0}
                baseSize={addPanelTarget?.addPanelSize ?? "none"}
                onClose={() => setAddPanelTarget(null)}
                onSubmit={handleSubmit}
            />
        </div>
    );
}