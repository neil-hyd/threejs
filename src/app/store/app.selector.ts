import { createSelector } from '@ngrx/store';
import { IAppLayout, IAppState } from './app.model';

export const selectLayout = (state: IAppState) => state.layout;

export const selectActiveLayout = createSelector(
  selectLayout,
  (state: IAppLayout) => state.layouts.find(x => x.id === state.activeLayout)
);

export const selectLayouts = createSelector(
  selectLayout,
  (state: IAppLayout) => state.layouts
);

export const selectLayoutState = createSelector(
  selectLayout,
  (state: IAppLayout) => state
);

export const selectFOV = createSelector(
  selectLayout,
  (state: IAppLayout) => state.fov
);
