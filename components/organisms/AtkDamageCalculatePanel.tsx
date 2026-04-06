'use client';

import { useEffect, useState } from 'react';
import { Panel } from '@/types/domain/Panel';
import { NATURE_MULTIPLIERS, PokemonBuild, StatKey } from '@/types/domain/PokemonBuild';
import SearchBar from '../atoms/SearchItem';
import { pokemonMap } from '@/lib/data/pokemonMap';
import { usePokemon } from '@/hooks/usePokemonData';
import NumberInput from '../atoms/NumberInput';
import { moveMap } from '@/lib/data/moveMap';
import { simpleStatMap } from '@/lib/data/statLabel';
import { enToJpTypeMap, getTypeEffectiveness } from '@/lib/data/typeMaps';
import { CircularProgress } from '@mui/material';
import { MdError } from 'react-icons/md';

type AtkDamageCalculatePanelProps = {
  panel: Panel;
  setPanelItems: React.Dispatch<React.SetStateAction<(Panel | null)[]>>;
  pokemonBuild: PokemonBuild;
};

type DefKey = 'hp' | 'def' | 'spd';
type DefStatKeys = 'def' | 'spd';

type DefEVs = Record<DefKey, number>;
type DefIVs = Record<DefKey, number>;
type DefNatures = Record<DefKey, number>;
type DefRanks = Record<DefStatKeys, number>;
type DefMul = Record<DefStatKeys, number>;

type AtkStatKeys = 'atk' | 'spa';
type AtkRanks = Record<AtkStatKeys, number>;
type AtkMul = Record<AtkStatKeys, number>;

export default function AtkDamageCalculatePanel({ panel, setPanelItems, pokemonBuild }: AtkDamageCalculatePanelProps) {
  const atkName = pokemonBuild.name && pokemonBuild.name !== '' ? pokemonBuild.name : 'pikachu';
  const [pokemonName, setPokemonName] = useState<string>(panel.settings?.pokemonName ?? 'pikachu');

  const { pokemon: atkPokemon, loading: atkLoading, error: atkError } = usePokemon(atkName);
  const { pokemon: defPokemon, loading: defLoading, error: defError } = usePokemon(pokemonName);

  // ===== 防御側 =====
  const [defEVs, setDefEVs] = useState<DefEVs>(panel.settings?.defEVs ?? { hp: 0, def: 0, spd: 0 });
  const [defIVs, setDefIVs] = useState<DefIVs>(panel.settings?.defIVs ?? { hp: 31, def: 31, spd: 31 });
  const [defNatures, setDefNatures] = useState<DefNatures>(panel.settings?.defNatures ?? { hp: 1, def: 1, spd: 1 });

  const [defRanks, setDefRanks] = useState<DefRanks>(panel.settings?.defRanks ?? { def: 0, spd: 0 });
  const [defMul1, setDefMul1] = useState<DefMul>(panel.settings?.defMul1 ?? { def: 1, spd: 1 });
  const [defMul2, setDefMul2] = useState<DefMul>(panel.settings?.defMul2 ?? { def: 1, spd: 1 });

  // ===== 攻撃側倍率 =====
  const [atkRanks, setAtkRanks] = useState<AtkRanks>(panel.settings?.atkRanks ?? { atk: 0, spa: 0 });
  const [atkMul1, setAtkMul1] = useState<AtkMul>(panel.settings?.atkMul1 ?? { atk: 1, spa: 1 });
  const [atkMul2, setAtkMul2] = useState<AtkMul>(panel.settings?.atkMul2 ?? { atk: 1, spa: 1 });

  useEffect(() => {
    setPanelItems((prev) =>
      prev.map((p) => {
        if (!p || p.id !== panel.id) return p;

        return {
          ...p,
          settings: {
            ...p.settings,
            defEVs,
            defIVs,
            defNatures,
            defRanks,
            defMul1,
            defMul2,
            atkRanks,
            atkMul1,
            atkMul2,
            pokemonName,
          },
        };
      }),
    );
  }, [defEVs, defIVs, defNatures, defRanks, defMul1, defMul2, atkRanks, atkMul1, atkMul2, pokemonName]);

  const getAtkStat = (type: 'atk' | 'spa') => {
    if (!atkPokemon) return 0;

    const base = atkPokemon.stats.find((s) => s.name === type)?.baseStat || 0;

    const iv = pokemonBuild.ivs[type];
    const ev = pokemonBuild.evs[type];
    const nature = NATURE_MULTIPLIERS[pokemonBuild.nature]?.[type] ?? 1;

    return Math.floor((((base * 2 + iv + ev / 4) * 50) / 100 + 5) * nature);
  };

  // ===== 計算 =====
  const rankMul = (rank: number) => (rank >= 0 ? (2 + rank) / 2 : 2 / (2 - rank));

  const calcHP = (base: number, iv: number, ev: number) => Math.floor(((base * 2 + iv + ev / 4) * 50) / 100 + 60);

  const calcStat = (base: number, iv: number, ev: number, nature: number) =>
    Math.floor((((base * 2 + iv + ev / 4) * 50) / 100 + 5) * nature);

  const calculateDamage = (move: any) => {
    if (!move || !atkPokemon || !defPokemon) {
      return { min: 0, max: 0 };
    }

    if (move.damageClass === 'status' || !move.power) {
      return { min: 0, max: 0 };
    }

    const level = 50;

    const isPhysical = move.damageClass === 'physical';

    const atkType = isPhysical ? 'atk' : 'spa';
    const defType = isPhysical ? 'def' : 'spd';

    // ===== 攻撃実数値 =====
    const atkReal = getAtkStat(atkType);

    const atkStat = atkReal * rankMul(atkRanks[atkType]) * atkMul1[atkType] * atkMul2[atkType];

    // ===== 防御実数値 =====
    const defBase = defPokemon.stats.find((s) => s.name === defType)?.baseStat || 50;

    const defStat =
      calcStat(defBase, defIVs[defType], defEVs[defType], defNatures[defType]) *
      rankMul(defRanks[defType]) *
      defMul1[defType] *
      defMul2[defType];

    const hpBase = defPokemon.stats.find((s) => s.name === 'hp')?.baseStat || 0;

    const hp = calcHP(hpBase, defIVs.hp, defEVs.hp);
    // ===== 基本ダメージ =====
    const A = Math.floor((2 * level) / 5 + 2);

    const B = Math.floor((A * move.power * atkStat) / defStat);

    const C = Math.floor(B / 50);

    const baseDamage = Math.floor(B / 50) + 2;

    // ===== STAB（タイプ一致）=====
    const stab = atkPokemon.types.includes(enToJpTypeMap[move.type]) ? 1.5 : 1.0;
    // ===== タイプ相性 =====
    const typeEffectiveness = getTypeEffectiveness(move.type, defPokemon.types);

    // ===== 急所（今は固定OFF）=====
    const critical = 1.0; // ←あとで1.5にできる

    // ===== その他補正 =====
    const modifier = stab * typeEffectiveness * critical;

    // ===== 乱数（16段階）=====
    const rolls = Array.from({ length: 16 }, (_, i) => 0.85 + i * 0.01);
    const damages = rolls.map((r) => Math.floor(Math.floor(baseDamage * r) * modifier));
    const min = Math.min(...damages);
    const max = Math.max(...damages);

    const minPct = (min / hp) * 100;
    const maxPct = (max / hp) * 100;

    return { min, max, minPct: Number(minPct.toFixed(1)), maxPct: Number(maxPct.toFixed(1)) };
  };

  const moves = pokemonBuild.moves.map((m) => moveMap.find((mv) => mv.english === m)).slice(0, 4);

  if (atkError || defError) {
    return (
      <div className="organism-panel organism-panel--centered organism-panel--error atkDamagePanelState">
        <MdError size={50} />
        Error loading Pokémon data.
      </div>
    );
  }

  if (atkLoading || defLoading) {
    return (
      <div className="organism-panel organism-panel--centered atkDamagePanelState">
        <CircularProgress enableTrackSlot size="3rem" />
      </div>
    );
  }

  return (
    <div className="atkDamagePanel">
      {/* ===== 攻撃側 ===== */}
      <div className="atkDamagePanelSection atkDamagePanelSection--attacker">
        <div className="atkDamagePanelSpacer" />
        {/* ヘッダー */}
        {atkPokemon &&
          (() => {
            const atk = getAtkStat('atk');
            const spa = getAtkStat('spa');

            return (
              <div className="atkDamagePanelHeader">
                <div className="atkDamagePanelHeaderRow">
                  {atkPokemon.sprites.frontDefault && (
                    <img src={atkPokemon.sprites.frontDefault} className="atkDamagePanelSprite" />
                  )}

                  <div>
                    <div className="atkDamagePanelTitle">
                      {pokemonMap.find((t) => t.english === atkPokemon.name)?.japanese ?? '-'}
                    </div>
                    <div className="atkDamagePanelMeta">
                      A:{atk} / C:{spa}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

        {/* ヘッダー行 */}
        <div className="atkDamagePanelGridHead atkDamagePanelGridHead--attacker">
          <div></div>
          <div>ランク</div>
          <div>倍率1</div>
          <div>倍率2</div>
        </div>

        {/* 行 */}
        {(['atk', 'spa'] as const).map((key) => (
          <div key={key} className="atkDamagePanelGridRow atkDamagePanelGridRow--attacker">
            <div className="atkDamagePanelStatLabel">{simpleStatMap[key as StatKey]}</div>

            <NumberInput
              value={atkRanks[key]}
              min={-6}
              max={6}
              onChange={(v) => setAtkRanks((p) => ({ ...p, [key]: v }))}
            />

            <NumberInput
              value={atkMul1[key]}
              min={0}
              max={5}
              step={0.1}
              onChange={(v) => setAtkMul1((p) => ({ ...p, [key]: v }))}
            />

            <NumberInput
              value={atkMul2[key]}
              min={0}
              max={5}
              step={0.1}
              onChange={(v) => setAtkMul2((p) => ({ ...p, [key]: v }))}
            />
          </div>
        ))}
      </div>

      {/* ===== 防御側 ===== */}
      <div className="atkDamagePanelSection atkDamagePanelSection--defender">
        <SearchBar
          items={pokemonMap}
          current={pokemonName}
          onSelect={(p) => {
            setPokemonName(p.english);
            setDefEVs({ hp: 0, def: 0, spd: 0 });
            setDefIVs({ hp: 31, def: 31, spd: 31 });
            setDefNatures({ hp: 1, def: 1, spd: 1 });
            setDefRanks({ def: 0, spd: 0 });
            setDefMul1({ def: 1, spd: 1 });
            setDefMul2({ def: 1, spd: 1 });
            setAtkRanks({ atk: 0, spa: 0 });
            setAtkMul1({ atk: 1, spa: 1 });
            setAtkMul2({ atk: 1, spa: 1 });
          }}
        />

        {/* ヘッダー */}
        {defPokemon &&
          (() => {
            const hpBase = defPokemon.stats.find((s) => s.name === 'hp')?.baseStat || 0;
            const defBase = defPokemon.stats.find((s) => s.name === 'def')?.baseStat || 0;
            const spdBase = defPokemon.stats.find((s) => s.name === 'spd')?.baseStat || 0;

            const hp = calcHP(hpBase, defIVs.hp, defEVs.hp);
            const def = calcStat(defBase, defIVs.def, defEVs.def, defNatures.def);
            const spd = calcStat(spdBase, defIVs.spd, defEVs.spd, defNatures.spd);

            return (
              <div className="atkDamagePanelHeader">
                <div className="atkDamagePanelHeaderRow">
                  <img src={defPokemon.sprites.frontDefault ?? ''} className="atkDamagePanelSprite" />
                  <div>
                    <div className="atkDamagePanelTitle">
                      {' '}
                      {pokemonMap.find((t) => t.english === defPokemon.name)?.japanese ?? '-'}
                    </div>
                    <div className="atkDamagePanelMeta">
                      HP:{hp} / B:{def} / D:{spd}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

        {/* カラムヘッダー */}
        <div className="atkDamagePanelGridHead atkDamagePanelGridHead--defender">
          <div></div>
          <div>努力値</div>
          <div>個体値</div>
          <div>性格</div>
          <div>ランク</div>
          <div>倍率1</div>
          <div>倍率2</div>
        </div>

        {(['hp', 'def', 'spd'] as const).map((key) => (
          <div key={key} className="atkDamagePanelGridRow atkDamagePanelGridRow--defender">
            <div className="atkDamagePanelStatLabel">{simpleStatMap[key as StatKey]}</div>

            <NumberInput
              value={defEVs[key]}
              min={0}
              max={252}
              step={4}
              onChange={(v) => setDefEVs((p) => ({ ...p, [key]: v }))}
            />

            <NumberInput
              value={defIVs[key]}
              min={0}
              max={31}
              step={1}
              onChange={(v) => setDefIVs((p) => ({ ...p, [key]: v }))}
            />
            {key !== 'hp' ? (
              <>
                <NumberInput
                  value={defNatures[key]}
                  min={0.9}
                  max={1.1}
                  step={0.1}
                  onChange={(v) => setDefNatures((p) => ({ ...p, [key]: v }))}
                />

                <NumberInput
                  value={defRanks[key]}
                  min={-6}
                  max={6}
                  onChange={(v) => setDefRanks((p) => ({ ...p, [key]: v }))}
                />

                <NumberInput
                  value={defMul1[key]}
                  min={0}
                  max={5}
                  step={0.1}
                  onChange={(v) => setDefMul1((p) => ({ ...p, [key]: v }))}
                />

                <NumberInput
                  value={defMul2[key]}
                  min={0}
                  max={5}
                  step={0.1}
                  onChange={(v) => setDefMul2((p) => ({ ...p, [key]: v }))}
                />
              </>
            ) : (
              <>
                <div></div>
                <div></div>
                <div></div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ===== ダメージ ===== */}
      <div className="atkDamagePanelDamage">
        <div className="atkDamagePanelDamageList">
          {moves.map((move, i) => {
            if (!move) return null;

            const { min, max, minPct, maxPct } = calculateDamage(move);

            // ===== クランプ（0〜100に制限）=====
            const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v));

            const safeMinPct = clamp(minPct ?? 0);
            const safeMaxPct = clamp(maxPct ?? 0);

            // ===== 残HP換算 =====
            const minRemain = clamp(100 - safeMaxPct);
            const maxRemain = clamp(100 - safeMinPct);

            // ===== 色 =====
            const getHpColor = (hpPct: number) => {
              if (hpPct <= 30) return '#e74c3c';
              if (hpPct <= 60) return '#f1c40f';
              return '#2ecc71';
            };

            const solidColor = getHpColor(minRemain);
            const lightColor = getHpColor(maxRemain);

            return (
              <div key={i}>
                {/* 技名 */}
                <div className="atkDamagePanelMoveTitle">{move.japanese}</div>

                {/* ===== HPバー ===== */}
                <div className="atkDamagePanelBar">
                  <svg
                    className="atkDamagePanelBarSvg"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    {minRemain > 0 && <rect x="0" y="0" width={minRemain} height="20" fill={solidColor} />}
                    {maxRemain > minRemain && (
                      <rect
                        className="atkDamagePanelBarRange"
                        x={minRemain}
                        y="0"
                        width={maxRemain - minRemain}
                        height="20"
                        fill={lightColor}
                      />
                    )}
                  </svg>
                </div>

                {/* ===== ダメージ表示 ===== */}
                <div className="atkDamagePanelMoveMeta">
                  {min} ~ {max} ({safeMinPct} ~ {safeMaxPct}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
