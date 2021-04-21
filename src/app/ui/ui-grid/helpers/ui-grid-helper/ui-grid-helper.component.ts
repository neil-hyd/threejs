import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Size, UIGrid } from 'src/app/ui/data/grid.model';
import { AppState, gridLineColor, gridSize, gridState } from '../../ui-grid.selector';

interface GridLine {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  className?: string;
}

@Component({
  selector: 'app-ui-grid-helper',
  templateUrl: './ui-grid-helper.component.html',
  styleUrls: ['./ui-grid-helper.component.scss']
})
export class UiGridHelperComponent implements AfterViewInit {

  gridLines: GridLine[] = [];

  state$: Observable<UIGrid>;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private store: Store<AppState>) {
      this.state$ = this.store.select(gridState);

      this.state$.subscribe(newState => {
        this.calculateGridLines(newState);
      });

      this.store.select(gridLineColor).subscribe(newColor => {
        this.elRef.nativeElement.style.setProperty('--grid-line-color', newColor);
      });
    }

  ngAfterViewInit() {


  }

  calculateGridLines(config: UIGrid) {

    if (!config) { return; }

    this.gridLines.length = 0;

    if (config.gridLines.enabled) {

      let leftPos = 0;
      for (let i = 0; i < config.grid.width; i++) {
        this.gridLines.push({
          key: `col${i}`,
          x1: leftPos,
          y1: 0,
          x2: leftPos,
          y2: config.viewport.height
        });
        leftPos += config.gridCellSize.width;
      }

      let topPos = 0;
      for (let p = 0; p < config.grid.height; p++) {
        this.gridLines.push({
          key: `row${p}`,
          x1: 0,
          y1: topPos,
          x2: config.viewport.width,
          y2: topPos
        });
        topPos += config.gridCellSize.height;
      }
    }
  }
}
