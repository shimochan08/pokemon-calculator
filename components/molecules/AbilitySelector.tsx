import { abilityMap } from "@/lib/data/abilityMap";

type AbilitySelectorProps = {
    ability: string;
    onChange: (newAbility: string) => void;
};

export function AbilitySelector({ ability, onChange }: AbilitySelectorProps) {
    return (
        <select
            value={ability}
            onChange={(e) => onChange(e.target.value)}
            style={{
                fontSize: 14,
                padding: "4px 8px",
                border: "1px solid #374151",
            }}
        >
            <option value="">特性を選択</option>
            {abilityMap.map((a) => (
                <option key={a.english} value={a.english}>
                    {a.japanese}
                </option>
            ))}
        </select>
    );
}