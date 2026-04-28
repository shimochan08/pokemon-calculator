'use client';

import { useCallback, useEffect, useRef } from 'react';
import { dashboardSlotLocalStorage } from '@/repositories/localStrage/dashboardSlotLocalStorage';
import { DashboardSlot } from '@/types/domain/DashboardSlot';

export function useDashboardSlotUpdate(
  slots: DashboardSlot[] | null,
  setSlots: React.Dispatch<React.SetStateAction<DashboardSlot[] | null>>,
) {
  const slotsRef = useRef(slots);

  useEffect(() => {
    slotsRef.current = slots;
  }, [slots]);

  const saveSlots = useCallback(async (next: DashboardSlot[]) => {
    await dashboardSlotLocalStorage.save(next);
    setSlots(next);
  }, [setSlots]);

  const updateSlotBuild = useCallback(async (slotId: number, buildId: string) => {
    const next = slotsRef.current?.map((slot) => {
      if (slot.slotId !== slotId) return slot;

      return {
        ...slot,
        buildId,
      };
    });

    await saveSlots(next ?? []);
  }, [saveSlots]);

  const updateSlotPanels = useCallback(async (slotId: number, panels: DashboardSlot['panels']) => {
    const next = slotsRef.current?.map((slot) => {
      if (slot.slotId !== slotId) return slot;

      return {
        ...slot,
        panels,
      };
    });

    await saveSlots(next ?? []);
  }, [saveSlots]);

  return {
    updateSlotBuild,
    updateSlotPanels,
  };
}
