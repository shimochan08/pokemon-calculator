import { Suspense } from 'react';
import PokemonBuilder from '@/components/templates/PokemonBuilder';

export default function PokemonBuilderPage() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>読み込み中...</div>}>
      <PokemonBuilder />
    </Suspense>
  );
}
