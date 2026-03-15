import { Panel, PanelInstance } from "@/types/domain/Panel";

export function mapPanelInstanceToPanel(
    instance: PanelInstance
): Panel {

    return {
        id: instance.instanceId,
        title: instance.panelId,
        size: instance.size,
        componentKey: instance.panelId
    };

}

export function mapPanelToInstance(
    panel: Panel
): PanelInstance {

    return {
        instanceId: panel.id,
        panelId: panel.componentKey,
        size: panel.size
    };

}