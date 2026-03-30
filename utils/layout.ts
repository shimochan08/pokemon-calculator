import { getColSpan, Panel, PanelSize, spanToSize } from '@/types/domain/Panel';

export type LayoutPanel = Panel & {
  originalIndex: number;
};

export const columns = 3;

export function rebuildLayout(items: (Panel | null)[]): LayoutPanel[][] {
  const rows: LayoutPanel[][] = [];

  let currentRow: LayoutPanel[] = [];
  let usedColumns = 0;

  const normalized = items.map((item, index) =>
    item ? { ...item, originalIndex: index } : createRowAddPanel('s', index),
  );

  normalized.forEach((item) => {
    const span = getColSpan(item.size);

    if (usedColumns + span > columns) {
      rows.push(fillRowWithAddPanels(currentRow, usedColumns));
      currentRow = [];
      usedColumns = 0;
    }

    currentRow.push(item);
    usedColumns += span;

    if (usedColumns === columns) {
      rows.push(mergeAddPanels(currentRow));
      currentRow = [];
      usedColumns = 0;
    }
  });

  if (currentRow.length > 0) {
    rows.push(mergeAddPanels(currentRow));
  }

  if (rows.length === 0) {
    rows.push([createRowAddPanel('none', items.length)]);
  } else {
    rows[rows.length - 1].push(createRowAddPanel('none', items.length));
  }

  return rows;
}

function fillRowWithAddPanels(row: LayoutPanel[], usedColumns: number): LayoutPanel[] {
  const remain = columns - usedColumns;

  if (remain <= 0) {
    return mergeAddPanels(row);
  }

  const insertIndex = row.length > 0 ? row[row.length - 1].originalIndex + 1 : 0;

  const filled = [...row, createRowAddPanel(spanToSize(remain), insertIndex)];

  return mergeAddPanels(filled);
}

function createRowAddPanel(size: PanelSize, originalIndex: number): LayoutPanel {
  return {
    id: crypto.randomUUID(),
    title: 'Add',
    size,
    componentKey: 'add_panel',
    originalIndex,
  };
}

function mergeAddPanels(row: LayoutPanel[]): LayoutPanel[] {
  const merged: LayoutPanel[] = [];

  for (let i = 0; i < row.length; i++) {
    const current = row[i];

    if (current.componentKey !== 'add_panel') {
      merged.push(current);
      continue;
    }

    let totalSpan = getColSpan(current.size);
    const baseIndex = current.originalIndex;

    while (i + 1 < row.length && row[i + 1].componentKey === 'add_panel') {
      totalSpan += getColSpan(row[i + 1].size);
      i++;
    }

    const newSize = spanToSize(totalSpan);

    merged.push(createRowAddPanel(newSize, baseIndex));
  }

  return merged;
}
