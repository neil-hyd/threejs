import { createAction, props } from '@ngrx/store';
import { UIGridState } from '../ui/ui-grid/store/ui-grid.model';

export const setActiveLayout = createAction('[Layout Component] SetActiveLayout', props<{ id: string }>());
export const createLayout = createAction('[Layout Component] CreateLayout', props<{ id: string, name: string }>());
export const deleteLayout = createAction('[Layout Component] DeleteLayout', props<{ id: string }>());
export const updateLayout = createAction('[Layout Component] UpdateLayout', props<{ grid: UIGridState }>());
