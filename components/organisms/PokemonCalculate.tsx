'use client';

import { useState } from 'react';
import "@/styles/dashboard.css";
import { usePokemon } from '@/hooks/usePokemonData';
import SearchBar from '../atoms/SearchItem';
import StatAdjuster from '../molecules/StatAdjuster';
import { pokemonMap } from "@/lib/data/pokemonMap";
import MoveSelector from '../molecules/MoveSelector';

export default function PokemonCalculate() {
    const [name, setName] = useState("pikachu");
    const { pokemon, loading, error } = usePokemon(name);

    if (loading) {
        return (
            <div className="panel">
                <div >
                    <p>読み込み中...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="panel">

            {/* 1段目 */}
            <div >
                <SearchBar
                    items={pokemonMap}
                    onSelect={(p) => setName(p.english)}
                />
                {error && <p className="error-text">{error}</p>}
            </div>

            {/* 2段目 */}
            {pokemon && (
                <div className="panel-main">

                    {/* 左 */}
                    <div className="panel-left">
                        <div className="col-image">
                            <img
                                src={pokemon.sprites.frontDefault ?? "/placeholder.png"}
                                alt={pokemon.name}
                                width={150}
                                height={150}
                            />
                        </div>

                        <div className="pokemon-name">
                            {pokemonMap.find(
                                (t) =>
                                    t.english === pokemon.name
                            )?.japanese ?? "-"}
                        </div>

                        <div className="pokemon-type">
                            <span>タイプ：</span>

                            {pokemon.types.length === 1 ? (
                                <span>{pokemon.types[0]}</span>
                            ) : (
                                <div>
                                    {pokemon.types.join(" / ")}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 中央 */}
                    <div className="col-middle">
                        <MoveSelector moves={pokemon.moves} />
                    </div>

                    {/* 右 */}
                    <div className="col-right">
                        <StatAdjuster stats={pokemon.stats} />
                    </div>

                </div>
            )}

        </div>
    );
}