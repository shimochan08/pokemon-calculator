import { itemMap } from "@/lib/data/itemMap";
import { Tooltip } from "@mui/material";

type ItemSelectorProps = {
    item: string;
    onChange: (newItem: string) => void;
};

export function ItemSelector({ item, onChange }: ItemSelectorProps) {
    const selectedItem = itemMap.find((i) => i.english === item);

    return (
        <Tooltip
            title={selectedItem?.effect || ""}
            arrow
            slotProps={{
                tooltip: {
                    sx: {
                        backgroundColor: "#111827",
                        color: "#fff",
                        padding: "8px 12px",
                    },
                },
                arrow: {
                    sx: {
                        color: "#111827",
                    },
                },
            }}
        ><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ minWidth: "60px" }}>持ち物: </div>
                <select
                    value={item}
                    onChange={(e) => onChange(e.target.value)}
                    style={{
                        fontSize: 14,
                        padding: "4px 8px",
                        border: "1px solid #374151",
                    }}
                >
                    <option value="">持ち物を選択</option>
                    {itemMap.map((i) => (
                        <option
                            key={i.english}
                            value={i.english}
                            style={{
                                color: i.english === item ? "#aaa" : "#000",
                            }}
                        >
                            {i.japanese}
                        </option>
                    ))}
                </select>
            </div>
        </Tooltip>
    );
}