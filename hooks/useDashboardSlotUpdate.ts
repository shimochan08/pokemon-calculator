"use client";

import { dashboardSlotLocalStorage } from "@/repositories/localStrage/dashboardSlotLocalStorage";
import { DashboardSlot } from "@/types/domain/DashboardSlot";

export function useDashboardSlotUpdate(
    slots: DashboardSlot[] | null,
    setSlots: React.Dispatch<React.SetStateAction<DashboardSlot[] | null>>
) {

    const saveSlots = async (next: DashboardSlot[]) => {

        await dashboardSlotLocalStorage.save(next);
        setSlots(next);

    };

    const updateSlotBuild = async (
        slotId: number,
        buildId: string
    ) => {

        const next = slots?.map(slot => {

            if (slot.slotId !== slotId) return slot;

            return {
                ...slot,
                buildId
            };

        });

        await saveSlots(next ?? []);
    };

    const updateSlotPanels = async (
        slotId: number,
        panels: DashboardSlot["panels"]
    ) => {

        const next = slots?.map(slot => {

            if (slot.slotId !== slotId) return slot;

            return {
                ...slot,
                panels
            };

        });

        await saveSlots(next ?? []);
    };

    return {
        updateSlotBuild,
        updateSlotPanels
    };
}