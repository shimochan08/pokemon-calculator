import SamplePanel from '@/components/organisms/SamplePanel';
import AddPanel from '@/components/molecules/AddPanel';
import { PanelSize } from '@/types/domain/Panel';
import AtkDamageCalculatePanel from '@/components/organisms/AtkDamageCalculatePanel';
import StatusRadarPanel from '@/components/organisms/StatusRadarPanel';
import ClockPanel from '@/components/organisms/ClockPanel';
import MemoPanel from '@/components/organisms/MemoPanel';

export type PanelDefinition = {
  key: string;
  label: string;
  component: React.FC<any>;
  allowedSizes: PanelSize[];
  selectable?: boolean;
};

export const panelRegistry: PanelDefinition[] = [
  {
    key: 'add_panel',
    label: 'Add Panel',
    component: AddPanel,
    allowedSizes: ['s', 'm', 'l'],
    selectable: false,
  },
  {
    key: 'sample',
    label: 'サンプル',
    component: SamplePanel,
    allowedSizes: ['s', 'm', 'l'],
    selectable: false,
  },
  {
    key: 'atk_damage_calculate',
    label: 'ダメージ計算（攻撃側）',
    component: AtkDamageCalculatePanel,
    allowedSizes: ['l'],
    selectable: true,
  },
  {
    key: 'status_radar',
    label: 'ステータスレーダー',
    component: StatusRadarPanel,
    allowedSizes: ['s'],
    selectable: true,
  },
  {
    key: 'clock',
    label: '時計',
    component: ClockPanel,
    allowedSizes: ['s'],
    selectable: true,
  },
  {
    key: 'memo',
    label: 'メモ帳',
    component: MemoPanel,
    allowedSizes: ['s', 'm', 'l'],
    selectable: true,
  },
];
