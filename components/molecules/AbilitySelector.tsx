import { abilityMap } from "@/lib/data/abilityMap";
import { Tooltip } from "@mui/material";

type AbilitySelectorProps = {
    ability: string;
    onChange: (newAbility: string) => void;
    pokemonAbilities: string[];
};

export function AbilitySelector({ ability, onChange, pokemonAbilities }: AbilitySelectorProps) {
    const selectedAbility = abilityMap.find((a) => a.english === ability);
    const availableAbilities = abilityMap.filter((a) =>
        pokemonAbilities.includes(a.english)
    );

    return (
        <Tooltip
            title={selectedAbility?.effect || ""}
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
                <div style={{ minWidth: "40px" }}>特性: </div>
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
                    {availableAbilities.map((a) => (
                        <option
                            key={a.english}
                            value={a.english}
                            style={{
                                color: a.english === ability ? "#aaa" : "#000",
                            }}
                        >
                            {a.japanese}
                        </option>
                    ))}
                </select>
            </div>
        </Tooltip>
    );
}