'use client';

import PickedMember from '../organisms/PickedMember';
import { useAllPokemonBuilds } from '@/hooks/useAllPokemonBuilds';
import { useDashboardSlotUpdate } from '@/hooks/useDashboardSlotUpdate';
import { MdAdd } from 'react-icons/md';

export default function PokemonList() {
  const { slots, setSlots, builds } = useAllPokemonBuilds();
  const { addSlot, deleteSlot } = useDashboardSlotUpdate(slots, setSlots);

  return (
    <div className="pokemon-list-page">
      <div className="pokemon-list-toolbar">
        <div>
          <h1>ポケモン一覧</h1>
          <p>{slots?.length ?? 0} Slot</p>
        </div>
        <button type="button" className="pokemon-list-addButton" onClick={addSlot}>
          <MdAdd size={20} />
          ポケモンを追加
        </button>
      </div>

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
              onDelete={deleteSlot}
            />
          );
        })}
      </div>
    </div>
  );
}
