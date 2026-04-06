import { itemMap } from '@/lib/data/itemMap';
import { selectorTooltipSlotProps } from '@/lib/ui/tooltipStyles';
import { Tooltip } from '@mui/material';

type ItemSelectorProps = {
  item: string;
  onChange: (newItem: string) => void;
};

export function ItemSelector({ item, onChange }: ItemSelectorProps) {
  const selectedItem = itemMap.find((i) => i.english === item);

  return (
    <Tooltip title={selectedItem?.effect || ''} arrow slotProps={selectorTooltipSlotProps}>
      <div className="selectorField">
        <div className="selectorLabel selectorLabel--item">持ち物: </div>
        <select className="selectorSelect" value={item} onChange={(e) => onChange(e.target.value)}>
          <option value="">持ち物を選択</option>
          {itemMap.map((i) => (
            <option key={i.english} value={i.english} className={i.english === item ? 'selectorOption--selected' : ''}>
              {i.japanese}
            </option>
          ))}
        </select>
      </div>
    </Tooltip>
  );
}
