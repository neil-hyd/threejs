import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { UIGrid } from 'src/app/ui/data/grid.model';
import { UiGridServiceService } from '../../service/ui-grid-service.service';
import { UiGridConfigComponent } from '../ui-grid-config/ui-grid-config.component';

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

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private gridService: UiGridServiceService) { }

  ngAfterViewInit() {

    this.gridService.gridConfig$.subscribe(newConfig => {
      this.calculateGridLines(newConfig);
    });

    this.gridService.gridConfig$.pipe(map(x => x.gridLines.color)).subscribe(newColor => {
      this.elRef.nativeElement.style.setProperty('--grid-line-color', newColor);
    });
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
          y2: this.gridService.viewport.height
        });
        leftPos += config.gridCellSize.width;
      }

      let topPos = 0;
      for (let p = 0; p < config.grid.height; p++) {
        this.gridLines.push({
          key: `row${p}`,
          x1: 0,
          y1: topPos,
          x2: this.gridService.viewport.width,
          y2: topPos
        });
        topPos += config.gridCellSize.height;
      }
    }
  }
}
