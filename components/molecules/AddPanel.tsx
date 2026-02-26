"use client";

import { FaPlus } from "react-icons/fa";
import { PanelSize } from "@/types/domain/Panel";
import "@/styles/item.css";

type AddPanelProps = {
    size: PanelSize;
    panelIndex: number;
    onOpen: (panelIndex: number, size: PanelSize) => void;
};

export default function AddPanel({
    size,
    panelIndex,
    onOpen,
}: AddPanelProps) {
    return (
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
            <button
                onClick={() => onOpen(panelIndex, size)}
                className="circle"
            >
                <FaPlus color="#374151" />
            </button>
        </div>
    );
}