"use client";

import { FaPlus } from "react-icons/fa";
import { Panel, PanelSize } from "@/types/domain/Panel";
import "@/styles/item.css";

type AddPanelProps = {
    panel: Panel;
    panelIndex: number;
    onOpen: (panelIndex: number, size: PanelSize) => void;
};

export default function AddPanel({
    panel,
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
                onClick={() => onOpen(panelIndex, panel.size)}
                className="circle"
            >
                <FaPlus color="#374151" />
            </button>
        </div>
    );
}