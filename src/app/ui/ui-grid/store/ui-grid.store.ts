import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import produce from 'immer';
import { Size } from '../../data/shared.model';
import { initialState, UIGridState } from './ui-grid.model';

@Injectable()
export class UIGridStore extends ComponentStore<UIGridState> {

  constructor() {
    super(initialState);
  }

  readonly setViewportSize = this.updater((state, viewport: Size) =>
    produce(state, newState => {
      newState.viewport = viewport;
      newState.grid = {
        width: Math.ceil(viewport.width / state.gridCellSize.width),
        height: Math.ceil(viewport.height / state.gridCellSize.height)
      };
    })
  );

  readonly setGridLineOpacity = this.updater((state, opacity: number) =>
    produce(state, newState => {
      if (typeof(opacity) === 'number') {
        newState.gridLines.opacity = opacity;
      }
    })
  );

  readonly setGridLineColor = this.updater((state, color: string) =>
    produce(state, newState => {
      if (typeof(color) === 'string') {
        newState.gridLines.color = color;
      }
    })
  );

  readonly setGridSize = this.updater((state, gridSize: Size) =>
    produce(state, newState => {
      newState.grid = gridSize;
    })
  );

  readonly setGridCellSize = this.updater((state, gridCellSize: Size) =>
    produce(state, newState => {
      newState.gridCellSize = gridCellSize;
      newState.grid = {
        width: Math.ceil(state.viewport.width / gridCellSize.width),
        height: Math.ceil(state.viewport.height / gridCellSize.height)
      };
    })
  );

  readonly toggleGridLines = this.updater((state, visible?: boolean) =>
    produce(state, newState => {
      if (typeof(visible) === 'boolean') {
        newState.gridLines.enabled = visible;
      } else {
        newState.gridLines.enabled = !state.gridLines.enabled;
      }
    })
  );

  gridLineEnabled$ = this.select((state: UIGridState) => state.gridLines.enabled);
  gridLineColor$ = this.select((state: UIGridState) => state.gridLines.color);
  gridLineOpacity$ = this.select((state: UIGridState) => state.gridLines.opacity);
  gridSize$ = this.select((state: UIGridState) => state.grid);
  gridCellSize$ = this.select((state: UIGridState) => state.gridCellSize);
  gridState$ = this.select((state: UIGridState) => state);
}
