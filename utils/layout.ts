import { getColSpan, Panel, PanelSize, spanToSize, } from "@/types/domain/Panel";

export const columns = 3;
export function rebuildLayout(items: Panel[]) {

    const rows: Panel[][] = [];

    let currentRow: Panel[] = [];
    let usedColumns = 0;

    items.forEach(item => {

        const span = getColSpan(item.size);

        if (usedColumns + span > columns && usedColumns !== columns) {
            rows.push([...currentRow]);
            const addPanelSize = spanToSize(columns - usedColumns);
            rows[rows.length - 1].push(createRowAddPanel(addPanelSize));

            currentRow = [item];
            if ((usedColumns + span) >= columns) {
                usedColumns = 0;
            } else {
                usedColumns = span;
            }

        } else {
            currentRow.push(item);
            if ((usedColumns + span) >= columns) {
                usedColumns = 0;
            } else {
                usedColumns += span;
            }
        }
    });

    rows.push([...currentRow]);
    rows[rows.length - 1].push(createRowAddPanel("none"));

    return rows;
}

function createRowAddPanel(size: PanelSize): Panel {
    return {
        id: crypto.randomUUID(),
        title: "Add",
        size: size,
        componentKey: "add_panel",
    };
}