import { abilityMap } from '@/lib/data/abilityMap';
import { selectorTooltipSlotProps } from '@/lib/ui/tooltipStyles';
import { Tooltip } from '@mui/material';

type AbilitySelectorProps = {
  ability: string;
  onChange: (newAbility: string) => void;
  pokemonAbilities: string[];
};

export function AbilitySelector({ ability, onChange, pokemonAbilities }: AbilitySelectorProps) {
  const selectedAbility = abilityMap.find((a) => a.english === ability);
  const availableAbilities = abilityMap.filter((a) => pokemonAbilities.includes(a.english));

  return (
    <Tooltip title={selectedAbility?.effect || ''} arrow slotProps={selectorTooltipSlotProps}>
      <div className="selectorField">
        <div className="selectorLabel">特性: </div>
        <select className="selectorSelect" value={ability} onChange={(e) => onChange(e.target.value)}>
          <option value="">特性を選択</option>
          {availableAbilities.map((a) => (
            <option
              key={a.english}
              value={a.english}
              className={a.english === ability ? 'selectorOption--selected' : ''}
            >
              {a.japanese}
            </option>
          ))}
        </select>
      </div>
    </Tooltip>
  );
}
