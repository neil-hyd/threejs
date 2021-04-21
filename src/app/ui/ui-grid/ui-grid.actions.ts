import { createAction, props } from '@ngrx/store';
import { Size } from '../data/grid.model';

export const setViewportSize = createAction('[UIGrid Component] SetViewportSize', props<{ size: Size }>());
export const toggleGridLines = createAction('[UIGrid Component] ToggleGridLines', props<{ visible?: boolean }>());
export const setGridSize = createAction('[UIGrid Component] SetGridSize', props<{ size: Size}>());
export const setGridCellSize = createAction('[UIGrid Component] SetGridCellSize', props<{ size: Size}>());
export const setGridLineColor = createAction('[UIGrid Component] SetGridLineColor', props<{color: string}>());
export const setGridLineOpacity = createAction('[UIGrid Component] SetGridLineOpacity', props<{opacity: number}>());
