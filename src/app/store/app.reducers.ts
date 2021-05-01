import { createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { initialState } from '../ui/ui-grid/store/ui-grid.model';
import * as LayoutActions from './app.actions';
import { defaultAppState, IAppLayout } from './app.model';


const AppLayoutReducer = createReducer<IAppLayout>(
  defaultAppState,
  on(LayoutActions.createLayout, (state, {id, name}) => {
    const newLayout = produce(initialState, newState => {
        newState.id = id;
        newState.name = name;
    });
    return produce(state, newState => {
      newState.activeLayout = id;
      newState.layouts.push(newLayout);
    });
  }),
  on(LayoutActions.deleteLayout, (state, {id}) => {
    return produce(state, newState => {
      newState.layouts = newState.layouts.filter(x => x.id !== id);

      if (newState.layouts.length > 0) {
        newState.activeLayout = newState.layouts[0].id;
      } else {
        newState.activeLayout = null;
      }
    });
  }),
  on(LayoutActions.setActiveLayout, (state, {id}) => {
    return produce(state, newState => {
      newState.activeLayout = id;
    });
  }),
  on(LayoutActions.updateLayout, (state, {grid}) => {
    return produce(state, newState => {
      newState.layouts = [...state.layouts.filter(x => x.id !== grid.id), grid];
    });
  }),
);

export function appLayoutReducer(state, action) {
  return AppLayoutReducer(state, action);
}
