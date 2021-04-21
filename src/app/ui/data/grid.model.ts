export interface Size {
  width: number;
  height: number;
}

export type GridMode = 'FitGrid' | 'FillViewport';

export interface UIGrid {

  viewport: Size;
  grid: Size;
  gridCellSize: Size;
  gridMode: GridMode;

  children: UIGridItem[];

  gridLines: {
    enabled: boolean;
    color: string;
    opacity: number;
  };
}

export interface UIGridItem {

  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
