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

    console.log("AddPanelDialog rendered", { open, panelIndex, baseSize });

    const maxSpan =
        baseSize && baseSize !== "none"
            ? getColSpan(baseSize)
            : getColSpan("l");

    const selectablePanels = panelRegistry.filter(
        panel => panel.selectable !== false
    );

    const selectedPanel = selectablePanels.find(
        p => p.key === selectedKey
    );

    const ALL_SIZES: PanelSize[] = ["s", "m", "l"];

    const canSubmit =
        selectedPanel &&
        selectedSize &&
        selectedPanel.allowedSizes.includes(selectedSize) &&
        getColSpan(selectedSize) <= maxSpan;

    return (
        <div className="appDialog" onClick={onClose}>
            <div
                className="appDialogContent"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="appDialogTitle">Add Panel</h3>

                {/* 種類選択 */}
                <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                    {selectablePanels.map(panel => (
                        <button
                            key={panel.key}
                            className={`appDialogButton ${selectedKey === panel.key
                                ? "appDialogButton--primary"
                                : ""
                                }`}
                            onClick={() => {
                                setSelectedKey(panel.key);
                                setSelectedSize(null); // 種類変わったらサイズリセット
                            }}
                        >
                            {panel.label}
                        </button>
                    ))}
                </div>

                {/* サイズ選択 */}
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                    {ALL_SIZES.map(size => {

                        const allowed =
                            selectedPanel &&
                            selectedPanel.allowedSizes.includes(size) &&
                            getColSpan(size) <= maxSpan;

                        return (
                            <button
                                key={size}
                                disabled={!allowed}
                                className={`appDialogButton ${selectedSize === size
                                    ? "appDialogButton--primary"
                                    : ""
                                    }`}
                                style={{
                                    opacity: allowed ? 1 : 0.3,
                                    cursor: allowed ? "pointer" : "not-allowed",
                                }}
                                onClick={() => {
                                    if (!allowed) return;
                                    setSelectedSize(size);
                                }}
                            >
                                {size.toUpperCase()}
                            </button>
                        );
                    })}
                </div>

                {/* アクションボタン */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 12,
                        marginTop: 32,
                    }}
                >
                    <button
                        className="appDialogButton"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="appDialogButton appDialogButton--primary"
                        disabled={!canSubmit}
                        onClick={() => {
                            if (!canSubmit || !selectedPanel || !selectedSize) return;

                            onSubmit(
                                panelIndex,
                                selectedSize,
                                selectedPanel.key,
                                baseSize
                            );
                            onClose();
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}