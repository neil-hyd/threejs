import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from './ui-grid.actions';
import { AppState } from './ui-grid.selector';


@Injectable()
export class UIGridEffects {

  @Effect() loadMovies$ = this.actions$.pipe(
    ofType(actions.setViewportSize),
    withLatestFrom(this.store$),
    switchMap(([action, state]) => {

      return of(actions.setGridSize({size: {
        width: Math.ceil(state.uiGrid.viewport.width / state.uiGrid.gridCellSize.width),
        height: Math.ceil(state.uiGrid.viewport.height / state.uiGrid.gridCellSize.height)
      }}));
    }
  ));

  @Effect() changeGridSize$ = this.actions$.pipe(
    ofType(actions.setGridCellSize),
    withLatestFrom(this.store$),
    switchMap(([action, state]) => {

      return of(actions.setGridSize({size: {
        width: Math.ceil(state.uiGrid.viewport.width / state.uiGrid.gridCellSize.width),
        height: Math.ceil(state.uiGrid.viewport.height / state.uiGrid.gridCellSize.height)
      }}));
    }
  ));

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>
  ) {
  }
}


