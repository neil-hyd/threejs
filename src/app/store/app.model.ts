import { initialState, UIGridState } from '../ui/ui-grid/store/ui-grid.model';

export interface IAppState {
  layout: IAppLayout;
}

export interface IAppLayout {
  activeLayout: string;
  layouts: UIGridState[];
  fov: number;
}

export const defaultAppState = {
  layouts: [initialState],
  activeLayout: initialState.id,
  fov: 452
};

