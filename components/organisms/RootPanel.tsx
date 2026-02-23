import { resolveComponent } from "@/utils/resolver";
import { PanelSize, Panel as PanelType } from "@/types/domain/Panel";

type RootPanelProps = {
    panel: PanelType;
    panelIndex: number;
    onSubmit: (
        panelIndex: number,
        size: PanelSize,
        componentKey: string,
        panelSize: PanelSize
    ) => void;
};

export default function RootPanel({ panel, panelIndex, onSubmit }: RootPanelProps) {
    const Component = resolveComponent(panel.componentKey);

    if (!Component) return null;
    return (
        <Component
            {...panel}
            panelIndex={panelIndex}
            onSubmit={onSubmit}
        />
    );
}