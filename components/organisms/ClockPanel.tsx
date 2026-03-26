"use client";

import { useEffect, useState } from "react";
import { Panel } from "@/types/domain/Panel";
import { TiDelete } from "react-icons/ti";

type SamplePanelProps = {
    panel: Panel;
    setPanelItems: React.Dispatch<React.SetStateAction<(Panel | null)[]>>;
};

export default function SamplePanel({ panel, setPanelItems }: SamplePanelProps) {
    const [time, setTime] = useState(new Date());
    const [records, setRecords] = useState<string[]>(panel.settings?.records ?? []);
    const maxRecords = 5;

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setPanelItems(prev => prev.map(p => {
            if (p?.id === panel.id) {
                return {
                    ...p,
                    settings: {
                        ...p.settings,
                        records,
                    },
                };
            }
            return p;
        }));
    }, [records]);

    const formatTime = (date: Date) => {
        const h = String(date.getHours()).padStart(2, "0");
        const m = String(date.getMinutes()).padStart(2, "0");
        const s = String(date.getSeconds()).padStart(2, "0");
        return `${h}:${m}:${s}`;
    };

    const addRecord = () => {
        if (records.length >= maxRecords) return;
        const current = formatTime(new Date());
        if (records.includes(current) || records.length >= maxRecords) return;
        setRecords(prev => [current, ...prev]);
    };

    const removeRecord = (index: number) => {
        setRecords(prev => prev.filter((_, i) => i !== index));
    };

    const displayRecords = Array.from({ length: maxRecords }, (_, i) => records[i] || null);

    return (
        <div
            style={{
                background: "var(--panel-background)",
                color: "white",
                height: "var(--height)",
                minWidth: 300,
                padding: 16,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 600,
                fontFamily: "'Orbitron', sans-serif",
            }}
        >
            <div style={{ fontSize: 24, letterSpacing: 2, marginBottom: 16 }}>
                {formatTime(time)}
            </div>

            <div style={{ display: "flex", width: "100%", maxWidth: 400, gap: 12 }}>
                <button
                    onClick={addRecord}
                    disabled={records.length >= maxRecords}
                    style={{
                        width: 120,
                        height: 40,
                        backgroundColor: records.length >= maxRecords ? "#888" : "#ff4081",
                        border: "none",
                        borderRadius: 6,
                        color: "white",
                        fontWeight: 600,
                        cursor: records.length >= maxRecords ? "not-allowed" : "pointer",
                        transition: "transform 0.1s",
                    }}
                    onMouseDown={e => {
                        if (records.length < maxRecords) e.currentTarget.style.transform = "scale(0.95)";
                    }}
                    onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
                >
                    記録
                </button>

                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        maxHeight: 200,
                    }}
                >
                    {displayRecords.map((t, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontSize: 14,
                                opacity: t ? 0.9 : 0.5,
                                padding: "6px 8px",
                                borderRadius: 6,
                                backgroundColor: t
                                    ? "rgba(255, 255, 255, 0.1)"
                                    : "rgba(255, 255, 255, 0.03)",
                                width: "100%",
                                minHeight: 32,
                            }}
                        >
                            <span>{t || ""}</span>
                            {t && (
                                <button
                                    onClick={() => removeRecord(i)}
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        color: "#ff4081",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        padding: "0 4px",
                                    }}
                                >
                                    <TiDelete size={20} style={{ color: "#888" }} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}