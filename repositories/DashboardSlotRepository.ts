import { DashboardSlot } from '@/types/domain/DashboardSlot';

export interface DashboardSlotRepository {
  load(): Promise<DashboardSlot[]>;
  save(slots: DashboardSlot[]): Promise<void>;
}
