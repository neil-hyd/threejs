import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Size, UIGrid } from '../../data/grid.model';

@Injectable({
  providedIn: 'root'
})
export class UiGridServiceService {

  gridConfig$ = new BehaviorSubject<UIGrid>({
    children: [],
    gridMode: 'FillViewport',
    grid: {
      width: 10,
      height: 10
    },
    gridCellSize: {
      width: 50,
      height: 50
    },
    gridLines: {
      enabled: true,
      scale: '',
      color: 'white'
    }
  });

  viewport: Size = {
    width: 0, height: 0
  };

  constructor() {
  }

  setGridConfig(newConfg: UIGrid) {
    this.gridConfig$.next(newConfg);
  }


  setGridColor(newColor: string) {

    const config = {... this.gridConfig$.value};

    config.gridLines.color = newColor;

    this.gridConfig$.next(config);
  }

  setGridColumnWidth(newWidth: number) {

    const config = {... this.gridConfig$.value};

    config.gridCellSize.width = newWidth;
    config.gridCellSize.height = newWidth;

    this.updateWithViewportSize(this.viewport);
  }

  toggleGrid(enabled?: boolean) {

    const config = {... this.gridConfig$.value};

    if (typeof enabled === 'boolean') {
      config.gridLines.enabled = enabled;
    } else {
      config.gridLines.enabled = !enabled;
    }

    this.gridConfig$.next(config);
  }

  updateWithViewportSize(viewportSize: Size) {

    const config = {... this.gridConfig$.value};

    this.viewport = viewportSize;

    switch (config.gridMode) {
      case 'FillViewport':
        config.grid = {
          width: Math.ceil(viewportSize.width / config.gridCellSize.width),
          height: Math.ceil(viewportSize.height / config.gridCellSize.height)
        };
        break;
      case 'FitGrid':
        config.gridCellSize = {
          width: viewportSize.width / config.grid.width,
          height: viewportSize.height / config.grid.height
        };
        break;
    }

    this.gridConfig$.next(config);
  }
}
