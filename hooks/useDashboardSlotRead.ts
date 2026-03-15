"use client";

import { useEffect, useState } from "react";
import { DashboardSlot } from "@/types/domain/DashboardSlot";
import { dashboardSlotLocalStorage } from "@/repositories/localStrage/dashboardSlotLocalStorage";

export function useDashboardSlotRead() {

    const [slots, setSlots] = useState<DashboardSlot[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const load = async () => {

            const data = await dashboardSlotLocalStorage.load();

            setSlots(data);
            setLoading(false);

        };

        load();

    }, []);

    return {
        slots,
        setSlots,
        loading
    };
}