"use client";

import { useState } from "react";
import { Panel } from "@/types/domain/Panel";
import { createPortal } from "react-dom";

type SamplePanelProps = {
    panel: Panel;
};

export default function SamplePanel({ panel }: SamplePanelProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                style={{
                    background: "var(--panel-background)",
                    color: "white",
                    height: "var(--height)",
                    padding: 16,
                    borderRadius: 8,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 600,
                    fontSize: 18,
                }}
            >
                <div>Sample Panel</div>

                <div style={{ marginTop: 8, fontSize: 14, opacity: 0.7 }}>
                    ID: {panel.id}
                </div>

                <div style={{ fontSize: 14, opacity: 0.7 }}>
                    Size: {panel.size.toUpperCase()}
                </div>

                <button
                    style={{
                        marginTop: 12,
                        padding: "6px 12px",
                        borderRadius: 6,
                        background: "#333",
                        color: "white",
                        cursor: "pointer",
                    }}
                    onClick={() => setOpen(true)}
                >
                    開く
                </button>
            </div>

            {open &&
                createPortal(
                    <div
                        onClick={() => setOpen(false)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 9999,
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: "white",
                                padding: 20,
                                borderRadius: 8,
                            }}
                        >
                            ダイアログ
                            <button onClick={() => setOpen(false)}>
                                閉じる
                            </button>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}