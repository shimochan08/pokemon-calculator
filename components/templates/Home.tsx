import PickedMember from '../organisms/PickedMember';
import { useAllPokemonBuilds } from '@/hooks/useAllPokemonBuilds';

export default function Home() {
  const { slots, builds, loading } = useAllPokemonBuilds();
  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100vh - 60px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '16px',
        padding: '16px',
      }}
    >
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
