'use client';

import { useEffect, useState } from 'react';
import "@/styles/dashboard.css";
import { usePokemon } from '@/hooks/usePokemonData';
import SearchBar from '../atoms/SearchItem';
import StatAdjuster from '../molecules/StatAdjuster';
import { pokemonMap } from "@/lib/data/pokemonMap";
import MoveSelector from '../molecules/MoveSelector';
import { usePokemonBuildUpdate } from '@/hooks/usePokemonBuildUpdate';
import { PokemonBuild, StatKey } from '@/types/domain/PokemonBuild';
import { AbilitySelector } from '../molecules/AbilitySelector';
import { ItemSelector } from '../molecules/ItemSelector';
import { CircularProgress } from '@mui/material';
import { MdError } from 'react-icons/md';

type PokemonCalculateProps = {
    build: PokemonBuild | null;
    buildId: string | null;
    setPokemonBuild: React.Dispatch<React.SetStateAction<PokemonBuild>>;
};

export default function PokemonCalculate({ build, buildId, setPokemonBuild }: PokemonCalculateProps) {

    const [pokemonName, setPokemonName] = useState(
        build?.name ?? "pikachu"
    );
    const { pokemon, loading, error } = usePokemon(pokemonName);
    const { updateBuild } = usePokemonBuildUpdate();
    const [isDirty, setIsDirty] = useState(false);

    const defaultIvs: Record<StatKey, number> = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };
    const defaultEvs: Record<StatKey, number> = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };

    const [ivs, setIvs] = useState<Record<StatKey, number>>(build?.ivs ?? defaultIvs);
    const [evs, setEvs] = useState<Record<StatKey, number>>(build?.evs ?? defaultEvs);
    const [moves, setMoves] = useState(build?.moves ?? []);
    const [ability, setAbility] = useState(build?.ability ?? "");
    const [battleTool, setBattleTool] = useState(build?.item ?? "");
    const [nature, setNature] = useState(build?.nature ?? "");
    const [skipEffect, setSkipEffect] = useState(false);

    useEffect(() => {

        if (!build) return;

        setPokemonName(build.name);
        setPokemonBuild(build);

    }, [build]);

    useEffect(() => {
        if (!pokemon) {
            setIsDirty(true);
            return;
        }
        if (!build) {
            return;
        }
        if (skipEffect) {
            setSkipEffect(false);
            return;
        }

        const currentBuild = {
            id: build.id,
            dex: pokemon.id,
            name: pokemon.name,
            ability: build.ability,
            item: build.item,
            moves: build.moves,
            ivs: build.ivs,
            evs: build.evs,
            nature: build.nature,
        };
        setIsDirty(JSON.stringify(currentBuild) !== JSON.stringify(build));
        setMoves(build.moves);
        setIvs(build.ivs);
        setEvs(build.evs);
        setAbility(build.ability);
        setBattleTool(build.item);
        setNature(build.nature);
    }, [build, pokemon]);

    const handleSave = () => {
        if (!pokemon) return;

        const newBuild: PokemonBuild = {
            ...(build ?? {}),
            id: buildId!,
            dex: pokemon.id,
            name: pokemon.name,
            ability: ability,
            item: battleTool,
            moves: moves,
            ivs: ivs,
            evs: evs,
            nature: nature,
        };

        updateBuild(newBuild);
        setIsDirty(false);
    }

    if (error) {
        return (
            <div
                className="panel"
                style={{
                    height: "var(--pokemon-panel-height)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "red",
                    fontSize: "18px",
                }}>
                <MdError size={50} />
                {error}
            </div>
        );
    }

    if (loading) {
        return (
            <div
                className="panel"
                style={{
                    height: "var(--pokemon-panel-height)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <CircularProgress enableTrackSlot size="3rem" />
            </div >
        );
    }

    return (
        <div className="panel" style={{ height: "var(--pokemon-panel-height)" }}>

            <div className="panel-header">
                <div className="panel-header-left">
                    <SearchBar
                        items={pokemonMap}
                        current={pokemonName}
                        onSelect={(p) => {
                            setPokemonName(p.english);
                            setMoves([]);
                            setIvs({ hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 });
                            setEvs({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 });
                            setNature("");
                            setAbility("");
                            setBattleTool("");
                            setSkipEffect(true);
                            setIsDirty(true);
                            setPokemonBuild((prev) => prev ? { ...prev, name: p.english, moves: [], ivs: defaultIvs, evs: defaultEvs, ability: "", item: "" } : prev);
                        }}
                    />

                    <AbilitySelector
                        ability={ability}
                        onChange={(newAbility) => {
                            setAbility(newAbility);
                            setIsDirty(true);
                            setPokemonBuild((prev) => prev ? { ...prev, ability: newAbility } : prev);
                        }}
                        pokemonAbilities={pokemon?.abilities ?? []}
                    />

                    <ItemSelector
                        item={battleTool}
                        onChange={(newItem) => {
                            setBattleTool(newItem);
                            setIsDirty(true);
                            setPokemonBuild((prev) => prev ? { ...prev, item: newItem } : prev);
                        }}
                    />
                    <button
                        className="save-button"
                        onClick={handleSave}
                        disabled={!isDirty}
                    >
                        {isDirty ? "Save" : "Saved ✓"}
                    </button>
                </div>
            </div>

            {pokemon && (
                <div className="panel-main">

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

                    <div className="col-middle">
                        <MoveSelector
                            availableMoves={pokemon.moves}
                            selectedMoves={moves}
                            onChange={(newMoves) => {
                                setMoves(newMoves);
                                setIsDirty(true);
                                setPokemonBuild((prev) => prev ? { ...prev, moves: newMoves } : prev);
                            }}
                        />
                    </div>

                    <div className="col-right">
                        <StatAdjuster
                            stats={pokemon.stats}
                            ivs={ivs}
                            evs={evs}
                            nature={nature}
                            onChange={(newIvs, newEvs, newNature) => {
                                setIvs(newIvs);
                                setEvs(newEvs);
                                setNature(newNature);
                                setIsDirty(true);
                                setPokemonBuild((prev) => prev ? { ...prev, ivs: newIvs, evs: newEvs, nature: newNature } : prev);
                            }}
                        />
                    </div>
                </div>

            )
            }

        </div >
    );
}