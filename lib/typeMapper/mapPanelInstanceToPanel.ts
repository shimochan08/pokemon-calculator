import { Panel, PanelInstance } from "@/types/domain/Panel";
import { panelRegistry } from "@/utils/panelRegistry";

export function mapPanelInstanceToPanel(
    instance: PanelInstance | null
): Panel | null {
    if (!instance) return null;

    return {
        id: instance.instanceId,
        title: panelRegistry.find(p => p.key === instance.panelKey)?.label ?? "",
        size: instance.size,
        componentKey: instance.panelKey,
        settings: instance.settings
    };

}

export function mapPanelToInstance(
    panel: Panel | null
): PanelInstance | null {
    if (!panel) return null;

    return {
        instanceId: panel.id,
        panelKey: panel.componentKey,
        size: panel.size,
        settings: panel.settings
    };

}