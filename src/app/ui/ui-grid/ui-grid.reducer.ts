import { createReducer, on } from '@ngrx/store';
import { UIGrid } from '../data/grid.model';
import * as UIGridActions from './ui-grid.actions';
import { produce} from 'immer';

export const initialState: UIGrid = {
  viewport: {
    width: 1024,
    height: 768
  },
  children: [],
  gridMode: 'FillViewport',
  grid: {
    width: 10,
    height: 10
  },
  gridCellSize: {
    width: 20,
    height: 20
  },
  gridLines: {
    enabled: true,
    color: 'white',
    opacity: 1
  }
};

const reducer = createReducer(
  initialState,
  on(UIGridActions.setViewportSize, (state, { size }) => {
    return produce(state, newState => {
      newState.viewport = size;
    });
  }),
  on(UIGridActions.setGridLineColor, (state, { color }) => {
    return produce(state, newState => {
      if (typeof(color) === 'string') {
        newState.gridLines.color = color;
      }
    });
  }),
  on(UIGridActions.setGridLineOpacity, (state, {opacity}) => {
    return produce(state, newState => {
      if (typeof(opacity) === 'number') {
        newState.gridLines.opacity = opacity;
      }
    });
  }),
  on(UIGridActions.setGridSize, (state, {size}) => {
    return produce(state, newState => {
      newState.grid = size;
    });
  }),
  on(UIGridActions.setGridCellSize, (state, {size}) => {
    return produce(state, newState => {
      newState.gridCellSize = size;
    });
  }),
  on(UIGridActions.toggleGridLines, (state, {visible}) => {
    return produce(state, newState => {
      if (typeof(visible) === 'boolean') {
        newState.gridLines.enabled = visible;
      } else {
        newState.gridLines.enabled = !state.gridLines.enabled;
      }
    });
  })
);

export function uiGridReducer(state: UIGrid, action) {
  return reducer(state, action);
}
