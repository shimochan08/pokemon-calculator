import { Tooltip } from '@mui/material';
import { natureMap } from '@/lib/data/natureMap';
import { STAT_LABEL } from '@/lib/data/statLabel';

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
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: '#111827',
            color: '#fff',
            padding: '8px 12px',
          },
        },
        arrow: {
          sx: {
            color: '#111827',
          },
        },
      }}
    >
      <select
        value={nature}
        onChange={(e) => onChange(e.target.value)}
        style={{
          fontSize: 14,
          padding: '4px 8px',
          border: '1px solid #374151',
          width: '40%',
          marginRight: 'auto',
        }}
      >
        {natureMap.map((n) => (
          <option
            key={n.english}
            value={n.english}
            style={{
              color: n.english === nature ? '#aaa' : '#000',
            }}
          >
            {n.japanese}
          </option>
        ))}
      </select>
    </Tooltip>
  );
}
