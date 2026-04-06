import { Tooltip } from '@mui/material';
import { natureMap } from '@/lib/data/natureMap';
import { STAT_LABEL } from '@/lib/data/statLabel';
import { selectorTooltipSlotProps } from '@/lib/ui/tooltipStyles';

type NatureSelectorProps = {
  nature: string;
  onChange: (newNature: string) => void;
};

export function NatureSelector({ nature, onChange }: NatureSelectorProps) {
  const selectedNature = natureMap.find((n) => n.english === nature);

  return (
    <Tooltip
      title={
        selectedNature
          ? `↑ ${selectedNature.increasedStat ? STAT_LABEL[selectedNature.increasedStat] : 'なし'} / ↓ ${selectedNature.decreasedStat ? STAT_LABEL[selectedNature.decreasedStat] : 'なし'}`
          : ''
      }
      arrow
      slotProps={selectorTooltipSlotProps}
    >
      <select
        className="selectorSelect selectorSelect--nature"
        value={nature}
        onChange={(e) => onChange(e.target.value)}
      >
        {natureMap.map((n) => (
          <option key={n.english} value={n.english} className={n.english === nature ? 'selectorOption--selected' : ''}>
            {n.japanese}
          </option>
        ))}
      </select>
    </Tooltip>
  );
}
