import { Point } from '@angular/cdk/drag-drop';
import { Size } from '../../data/shared.model';

export interface UIJogComponentState {
  uiState: UIJogState;
}

export interface ActiveInputState {

  event: MouseEvent | TouchEvent;
  rawPoint: Point;
  normalisedPoint: Point;
  angle: number;
}

export interface UIJogState {
  id: string;
  active: boolean;
  min: number;
  max: number;
  size: Size;
  center: Point;
  arcSegments: UIJogArcSegments;
  arcWidth: number;
  startState?: ActiveInputState;
  lastState?: ActiveInputState;
  thisState?: ActiveInputState;
}

export interface UIJogArcSegments {
  innerRadius: number;
  outerRadius: number;
}

export const initialState: UIJogState = {
  id: '',
  active: false,
  min: 0,
  max: 100,
  size: {width: 0, height: 0},
  center: {x: 0, y: 0},
  arcSegments: {
    innerRadius: 0,
    outerRadius: 0
  },
  arcWidth: 0
};
