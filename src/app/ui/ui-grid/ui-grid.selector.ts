import { createSelector } from '@ngrx/store';
import { UIGrid } from '../data/grid.model';

export interface AppState {
  uiGrid: UIGrid;
}

export const selectGridState = (state: AppState) => state.uiGrid;

export const gridLineEnabled = createSelector(
  selectGridState,
  (state: UIGrid) => state.gridLines.enabled
);

export const gridLineColor = createSelector(
  selectGridState,
  (state: UIGrid) => state.gridLines.color
);

export const gridLineOpacity = createSelector(
  selectGridState,
  (state: UIGrid) => state.gridLines.opacity
);

export const gridSize = createSelector(
  selectGridState,
  (state: UIGrid) => state.grid
);

export const gridCellSize = createSelector(
  selectGridState,
  (state: UIGrid) => state.gridCellSize
);

export const gridState = createSelector(
  (state: AppState) => state.uiGrid,
  (uiGrid: UIGrid) => uiGrid
);
