'use client';

import PickedMember from '../organisms/PickedMember';
import { useAllPokemonBuilds } from '@/hooks/useAllPokemonBuilds';

export default function PokemonList() {
  const { slots, builds } = useAllPokemonBuilds();
  return (
    <div className="pokemon-list-grid">
      {slots?.map((slot, idx) => {
        const build = builds?.[idx];
        return (
          <PickedMember
            key={slot.slotId}
            slotId={slot.slotId}
            name={build?.name}
            dex={build?.dex}
            ability={build?.ability}
            item={build?.item}
            moves={build?.moves}
            nature={build?.nature}
            ivs={build?.ivs}
            evs={build?.evs}
          />
        );
      })}
    </div>
  );
}
