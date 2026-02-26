"use client";

import { PanelSize, getColSpan } from "@/types/domain/Panel";

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
    if (!open) return null;
    console.log("AddPanelDialog rendered with props:", { open, panelIndex, baseSize });

    const PANEL_SIZES: PanelSize[] = ["s", "m", "l"];

    const maxSpan =
        baseSize && baseSize !== "none"
            ? getColSpan(baseSize)
            : getColSpan("l");

    const availableSizes = PANEL_SIZES.filter(
        (size) => getColSpan(size) <= maxSpan
    );

    return (
        <div className="appDialog" onClick={onClose}>
            <div
                className="appDialogContent"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="appDialogTitle">
                    Select Panel Size
                </h3>

                <div
                    className="appDialogActions"
                    style={{ justifyContent: "center", marginTop: 24 }}
                >
                    {availableSizes.map((size) => (
                        <button
                            key={size}
                            className="appDialogButton appDialogButton--primary"
                            onClick={() => {
                                onSubmit(panelIndex, size, size, baseSize);
                                onClose();
                            }}
                        >
                            {size.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}