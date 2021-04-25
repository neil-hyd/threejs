import { Size } from '../../data/shared.model';

export type GridMode = 'FitGrid' | 'FillViewport';

export interface UIGridState {

  id: string;
  name: string;
  viewport: Size;
  grid: Size;
  gridCellSize: Size;
  gridMode: GridMode;

  gridLines: {
    enabled: boolean;
    color: string;
    opacity: number;
  };
}

export interface UIGridItemState {

  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const initialState: UIGridState = {
  id: 'test',
  name: 'Default Grid',
  viewport: {
    width: 1024,
    height: 768
  },
  gridMode: 'FillViewport',
  grid: {
    width: 10,
    height: 10
  },
  gridCellSize: {
    width: 50,
    height: 50
  },
  gridLines: {
    enabled: false,
    color: 'white',
    opacity: 1
  }
};
