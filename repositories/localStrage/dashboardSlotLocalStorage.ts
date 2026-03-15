import { DashboardSlot } from "@/types/domain/DashboardSlot";
import { DashboardSlotRepository } from "../DashboardSlotRepository";

const KEY = "dashboard-slots";

const createInitialSlots = (): DashboardSlot[] =>
    Array.from({ length: 6 }, (_, i) => ({
        slotId: i,
        buildId: null,
        panels: []
    }));

export const dashboardSlotLocalStorage: DashboardSlotRepository = {

    async load() {

        if (typeof window === "undefined") {
            return createInitialSlots();
        }

        const data = localStorage.getItem(KEY);

        if (!data) {

            const initial = createInitialSlots();

            localStorage.setItem(KEY, JSON.stringify(initial));

            return initial;
        }

        return JSON.parse(data);
    },

    async save(slots: DashboardSlot[]) {

        if (typeof window === "undefined") return;

        localStorage.setItem(KEY, JSON.stringify(slots));
    }
};