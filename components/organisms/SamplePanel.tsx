"use client";

import { Panel } from "@/types/domain/Panel";

type SamplePanelProps = {
    panel: Panel;
};

export default function SamplePanel({ panel }: SamplePanelProps) {

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

            </div>
        </>
    );
}