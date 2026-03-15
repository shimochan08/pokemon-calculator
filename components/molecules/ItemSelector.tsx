import { itemMap } from "@/lib/data/itemMap";

type ItemSelectorProps = {
    item: string;
    onChange: (newItem: string) => void;
};

export function ItemSelector({ item, onChange }: ItemSelectorProps) {
    return (
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
                <option key={i.english} value={i.english}>
                    {i.japanese}
                </option>
            ))}
        </select>
    );
}