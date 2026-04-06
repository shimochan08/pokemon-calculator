import { resolveComponent } from '@/utils/resolver';
import { Panel, PanelSize, Panel as PanelType } from '@/types/domain/Panel';
import { TiDelete } from 'react-icons/ti';
import { PokemonBuild } from '@/types/domain/PokemonBuild';

type RootPanelProps = {
  panel: PanelType;
  panelIndex: number;
  onOpenAddPanel: (index: number, size: PanelSize) => void;
  onDelete: (panelIndex: number, size: PanelSize) => void;
  panelItems: (Panel | null)[];
  setPanelItems: React.Dispatch<React.SetStateAction<(Panel | null)[]>>;
  pokemonBuild: PokemonBuild;
};

export default function RootPanel({
  panel,
  panelIndex,
  onOpenAddPanel,
  onDelete,
  panelItems,
  setPanelItems,
  pokemonBuild,
}: RootPanelProps) {
  const Component = resolveComponent(panel.componentKey);

  if (!Component) return null;

  const isAddPanel = panel.componentKey === 'add_panel';

  return (
    <div className={`panel ${isAddPanel ? 'panel--add' : ''}`}>
      {!isAddPanel && (
        <>
          <div className="rootPanelTitle">{panel.title || 'Untitled'}</div>

          <button className="deleteButton" onClick={() => onDelete(panelIndex, panel.size)}>
            <TiDelete size={24} />
          </button>
        </>
      )}

      <div className="panelContent">
        <Component
          panel={panel}
          panelIndex={panelIndex}
          onOpen={onOpenAddPanel}
          panelItems={panelItems}
          setPanelItems={setPanelItems}
          pokemonBuild={pokemonBuild}
        />
      </div>
    </div>
  );
}
