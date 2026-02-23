import { useState } from "react";
import { getColSpan, PanelSize } from "@/types/domain/Panel";
import { FaPlus } from "react-icons/fa";
import "@/styles/item.css";

type AddPanelProps = {
    size: PanelSize;
    panelIndex: number;
    onSubmit: (
        panelIndex: number,
        size: PanelSize,
        componentKey: string,
        panelSize: PanelSize
    ) => void;
};

export default function AddPanel({ size, panelIndex, onSubmit }: AddPanelProps) {
    const [open, setOpen] = useState(false);

    const PANEL_SIZES: PanelSize[] = ["s", "m", "l"];

    const maxSpan =
        size && size !== "none"
            ? getColSpan(size)
            : getColSpan("l");
    const availableSizes = PANEL_SIZES.filter(
        (panelSize) => getColSpan(panelSize) <= maxSpan
    );

    return (
        <>
            <div
                style={{
                    height: "var(--height)",
                    background: "#182230",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "32px",
                }}
            >
                <button onClick={() => setOpen(true)} className="circle">
                    <FaPlus color="#374151" />
                </button>
            </div>

            {open && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={() => setOpen(false)}
                >
                    <div
                        style={{
                            background: "#1f2937",
                            padding: 24,
                            borderRadius: 12,
                            color: "#fff",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Select Size</h3>

                        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                            {availableSizes.map((selectedSize) => (
                                <button
                                    key={selectedSize}
                                    onClick={() => {
                                        onSubmit(panelIndex, selectedSize, selectedSize, size);
                                        setOpen(false);
                                    }}
                                >
                                    {selectedSize.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}