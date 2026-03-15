import SamplePanel from "@/components/organisms/SamplePanel";
import AddPanel from "@/components/molecules/AddPanel";
import { PanelSize } from "@/types/domain/Panel";

export type PanelDefinition = {
    key: string;
    label: string;
    component: React.FC<any>;
    allowedSizes: PanelSize[];
    selectable?: boolean;
};

export const panelRegistry: PanelDefinition[] = [
    {
        key: "add_panel",
        label: "Add Panel",
        component: AddPanel,
        allowedSizes: ["s", "m", "l"],
        selectable: false,
    },
    {
        key: "sample",
        label: "Sample Panel",
        component: SamplePanel,
        allowedSizes: ["s", "m", "l"],
        selectable: true,
    },
];