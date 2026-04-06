'use client';

import { usePokemon } from '@/hooks/usePokemonData';
import { simpleStatMap } from '@/lib/data/statLabel';
import { PokemonBuild, STATS, NATURE_MULTIPLIERS, StatKey } from '@/types/domain/PokemonBuild';
import { CircularProgress } from '@mui/material';
import { MdError } from 'react-icons/md';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type StatusRadarPanelProps = {
  pokemonBuild: PokemonBuild;
};

export default function StatusRadarPanel({ pokemonBuild }: StatusRadarPanelProps) {
  const { pokemon, loading, error } = usePokemon(
    pokemonBuild.name !== '' && pokemonBuild.name !== null ? pokemonBuild.name : 'pikachu',
  );
  if (error) {
    return (
      <div className="organism-panel organism-panel--centered organism-panel--error statusRadarPanel">
        <MdError size={50} />
        Error loading Pokémon data.
      </div>
    );
  }
  if (!pokemon || loading) {
    return (
      <div className="organism-panel organism-panel--centered statusRadarPanel">
        <CircularProgress enableTrackSlot size="3rem" />
      </div>
    );
  }

  const calcStat = (stat: StatKey, base: number, iv: number, ev: number, nature: number, level = 50) => {
    if (stat === 'hp') return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100 + level + 10);
    return Math.floor(Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100 + 5) * nature);
  };

  const data = STATS.map((stat) => {
    const baseStat = pokemon.stats.find((s) => s.name === stat)?.baseStat ?? 0;
    const iv = pokemonBuild.ivs[stat];
    const ev = pokemonBuild.evs[stat];
    const natureMultiplier = NATURE_MULTIPLIERS[pokemonBuild.nature]?.[stat] ?? 1;

    return {
      stat,
      base: baseStat,
      value: calcStat(stat, baseStat, iv, ev, natureMultiplier),
    };
  });

  const statusOrder: StatKey[] = ['hp', 'atk', 'def', 'spe', 'spd', 'spa'];
  const orderedData = statusOrder.map((key) => data.find((d) => d.stat === key)!);
  return (
    <div className="organism-panel statusRadarPanel">
      <div className="statusRadarPanelBody">
        <div className="statusRadarPanelColumn">
          <div className="statusRadarPanelLabel">種族値</div>
          <div className="statusRadarPanelChart">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={orderedData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="stat" tickFormatter={(tick, index) => `${simpleStatMap[tick as StatKey]}`} />
                <PolarRadiusAxis axisLine={false} tick={false} domain={[0, 300]} />
                <Radar name="種族値" dataKey="base" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="statusRadarPanelColumn">
          <div className="statusRadarPanelLabel">実数値</div>
          <div className="statusRadarPanelChart">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={orderedData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="stat" tickFormatter={(tick, index) => `${simpleStatMap[tick as StatKey]}`} />
                <PolarRadiusAxis axisLine={false} tick={false} domain={[0, 300]} />
                <Radar name="実数値" dataKey="value" stroke="#FFCE00" fill="#FFCE00" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
