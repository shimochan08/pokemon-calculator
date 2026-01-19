"use client";

import { usePokemon } from "@/hooks/usePokemonData";
import { useState } from "react";
import SearchBar from "../atoms/SearchItem";
import { pokemonMap } from "@/lib/data/pokemonMap";
import { translateType } from "@/lib/predict/translateType";
import StatAdjuster from "../organisms/StatAdjuster";

export default function CalculateStatusTemplate() {
    const [name, setName] = useState("pikachu");
    const { pokemon, loading, error } = usePokemon(name);

    return (
        <div style={{ textAlign: "center", marginTop: "40px", background: "#f3f4f6", padding: "24px", }}>
            <SearchBar
                items={pokemonMap}
                onSelect={(p) => {
                    setName(p.english);
                }}
            />

            {loading && <p>読み込み中...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {pokemon && (
                <div>
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        width={150}
                        height={150}
                    />
                    <p>
                        タイプ:{" "}
                        {pokemon.types
                            .map((t: any) => translateType(t.type.name))
                            .join(" / ")}
                    </p>
                    <StatAdjuster stats={pokemon.stats} />
                </div>
            )}
        </div>
    );
}
