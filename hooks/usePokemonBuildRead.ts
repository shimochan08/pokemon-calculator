'use client';

import { useEffect, useState } from 'react';
import { PokemonBuild } from '@/types/domain/PokemonBuild';
import { pokemonBuildLocalStorage } from '@/repositories/localStrage/pokemonBuildLocalStorage';

export function usePokemonBuildRead(buildId: string | null) {
  const [build, setBuild] = useState<PokemonBuild | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!buildId) {
      setLoading(false);
      return;
    }

    const load = async () => {
      const data = await pokemonBuildLocalStorage.load(buildId);
      setBuild(data);
      setLoading(false);
    };

    load();
  }, [buildId]);

  return {
    build,
    loading,
  };
}
