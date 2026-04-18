'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDashboardSlotRead } from '@/hooks/useDashboardSlotRead';
import { pokemonBuildLocalStorage } from '@/repositories/localStrage/pokemonBuildLocalStorage';
import { DashboardSlot } from '@/types/domain/DashboardSlot';
import { PokemonBuild } from '@/types/domain/PokemonBuild';

type PokemonBuildsContextValue = {
  slots: DashboardSlot[] | null;
  builds: (PokemonBuild | null)[];
  loading: boolean;
  refetchBuilds: () => Promise<void>;
};

const PokemonBuildsContext = createContext<PokemonBuildsContextValue | null>(null);

export function PokemonBuildsProvider({ children }: { children: React.ReactNode }) {
  const { slots, loading: slotsLoading } = useDashboardSlotRead();
  const [builds, setBuilds] = useState<(PokemonBuild | null)[]>([null, null, null, null, null, null]);
  const [loading, setLoading] = useState(true);

  const refetchBuilds = useCallback(async () => {
    if (!slots?.length) {
      setBuilds([null, null, null, null, null, null]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const nextBuilds = await Promise.all(
      slots.map((slot) => (slot.buildId ? pokemonBuildLocalStorage.load(slot.buildId) : null)),
    );

    setBuilds(nextBuilds);
    setLoading(false);
  }, [slots]);

  useEffect(() => {
    if (slotsLoading) return;

    refetchBuilds();
  }, [slotsLoading, refetchBuilds]);

  const value = useMemo(
    () => ({
      slots,
      builds,
      loading,
      refetchBuilds,
    }),
    [slots, builds, loading, refetchBuilds],
  );

  return <PokemonBuildsContext.Provider value={value}>{children}</PokemonBuildsContext.Provider>;
}

export function usePokemonBuildsContext() {
  const context = useContext(PokemonBuildsContext);

  if (!context) {
    throw new Error('usePokemonBuildsContext must be used within PokemonBuildsProvider');
  }

  return context;
}
