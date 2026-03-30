export type PanelSize = 'none' | 's' | 'm' | 'l';
export type Panel = {
  id: string;
  title: string;
  size: PanelSize;
  componentKey: string;
  settings?: Record<string, any>;
};

export const getColSpan = (size: PanelSize) => {
  switch (size) {
    case 'none':
      return 0;
    case 's':
      return 1;
    case 'm':
      return 2;
    case 'l':
      return 3;
  }
};

export const spanToSize = (span: number): PanelSize => {
  switch (span) {
    case 1:
      return 's';
    case 2:
      return 'm';
    case 3:
      return 'l';
    default:
      return 'none';
  }
};

export type PanelInstance = {
  instanceId: string;
  panelKey: string;

  size: PanelSize;

  settings?: Record<string, any>;
};
