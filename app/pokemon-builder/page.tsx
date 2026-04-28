import { Suspense } from 'react';
import PokemonBuilder from '@/components/templates/PokemonBuilder';
import PanelLoading from '@/components/atoms/PanelLoading';

export default function PokemonBuilderPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: 20 }}>
          <PanelLoading />
        </div>
      }
    >
      <PokemonBuilder />
    </Suspense>
  );
}
