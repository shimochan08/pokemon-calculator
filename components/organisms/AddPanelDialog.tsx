"use client";

import { useState, useEffect } from "react";
import { PanelSize, getColSpan } from "@/types/domain/Panel";
import { panelRegistry } from "@/utils/panelRegistry";

type AddPanelDialogProps = {
    open: boolean;
    panelIndex: number;
    baseSize: PanelSize;
    onClose: () => void;
    onSubmit: (
        panelIndex: number,
        size: PanelSize,
        componentKey: string,
        panelSize: PanelSize
    ) => void;
};

export default function AddPanelDialog({
    open,
    panelIndex,
    baseSize,
    onClose,
    onSubmit,
}: AddPanelDialogProps) {
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<PanelSize | null>(null);

    useEffect(() => {
        if (!open) {
            setSelectedKey(null);
            setSelectedSize(null);
        }
    }, [open]);

    if (!open) return null;

    const maxSpan = baseSize && baseSize !== "none" ? getColSpan(baseSize) : getColSpan("l");
    const ALL_SIZES: PanelSize[] = ["s", "m", "l"];

    const selectablePanels = selectedSize
        ? panelRegistry.filter(
            (panel) =>
                panel.selectable !== false &&
                panel.allowedSizes.includes(selectedSize) &&
                getColSpan(selectedSize) <= maxSpan
        )
        : [];

    const selectedPanel = selectablePanels.find((p) => p.key === selectedKey);

    const canSubmit = !!selectedSize && !!selectedKey && !!selectedPanel;

    return (
        <div className="appDialog" onClick={onClose}>
            <div
                className="appDialogContent"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: 500,
                    height: 400,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h3 className="appDialogTitle">追加するパネルを選択してください</h3>
                <div className="appDialogInfo" style={{ flex: 1, overflowY: "auto", padding: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
                        <p style={{ marginBottom: 8, fontWeight: 500, alignSelf: "flex-start" }}>サイズを選択してください</p>
                        <div style={{ display: "flex", gap: 12 }}>
                            {ALL_SIZES.map((size) => {
                                const allowed = getColSpan(size) <= maxSpan;
                                return (
                                    <button
                                        key={size}
                                        disabled={!allowed}
                                        className={`appDialogButton ${selectedSize === size ? "appDialogButton--primary" : ""}`}
                                        style={{
                                            minWidth: 60,
                                            padding: "8px 0",
                                            opacity: allowed ? 1 : 0.3,
                                            cursor: allowed ? "pointer" : "not-allowed",
                                        }}
                                        onClick={() => {
                                            if (!allowed) return;
                                            setSelectedSize(size);
                                            setSelectedKey(null);
                                        }}
                                    >
                                        {size.toUpperCase()}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {selectedSize && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
                            <p style={{ marginBottom: 8, fontWeight: 500, alignSelf: "flex-start" }}>パネルを選択してください</p>
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                                {selectablePanels.map((panel) => (
                                    <button
                                        key={panel.key}
                                        className={`appDialogButton ${selectedKey === panel.key ? "appDialogButton--primary" : ""}`}
                                        style={{ minWidth: 80, padding: "8px 0" }}
                                        onClick={() => setSelectedKey(panel.key)}
                                    >
                                        {panel.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="appDialogActions">
                    <button className="appDialogButton appDialogButton--secondary" onClick={onClose}>キャンセル</button>
                    <button
                        className="appDialogButton appDialogButton--primary"
                        disabled={!canSubmit}
                        onClick={() => {
                            if (!canSubmit || !selectedPanel || !selectedSize) return;
                            onSubmit(panelIndex, selectedSize, selectedPanel.key, baseSize);
                            onClose();
                        }}
                    >
                        追加
                    </button>
                </div>
            </div>
        </div >
    );
}