import { PanelInstance } from './Panel';

export type DashboardSlot = {
  slotId: number;

  buildId: string | null;

  panels: (PanelInstance | null)[];
};
