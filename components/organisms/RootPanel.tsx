import { resolveComponent } from "@/utils/resolver";
import { PanelSize, Panel as PanelType } from "@/types/domain/Panel";
import { TiDelete } from "react-icons/ti";
import "@/styles/dashboard.css";

type RootPanelProps = {
    panel: PanelType;
    panelIndex: number;
    onOpenAddPanel: (index: number, size: PanelSize) => void;
    onDelete: (panelIndex: number, size: PanelSize) => void;
};

export default function RootPanel({ panel, panelIndex, onOpenAddPanel, onDelete }: RootPanelProps) {
    const Component = resolveComponent(panel.componentKey);

    if (!Component) return null;

    const isAddPanel = panel.componentKey === "add_panel";

    return (
        <div className={`panel ${isAddPanel ? "panel--add" : ""}`}>
            {!isAddPanel && (
                <>
                    <div className="rootPanelTitle">
                        {panel.title || "Untitled"}
                    </div>

                    <button
                        className="deleteButton"
                        onClick={() => onDelete(panelIndex, panel.size)}
                    >
                        <TiDelete size={24} />
                    </button>
                </>
            )}

            <div className="panelContent">
                <Component
                    {...panel}
                    panelIndex={panelIndex}
                    onOpen={onOpenAddPanel}
                />
            </div>
        </div>
    );
}