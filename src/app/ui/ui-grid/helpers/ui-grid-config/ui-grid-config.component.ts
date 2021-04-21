import { Component, ElementRef, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UiGridServiceService } from '../../service/ui-grid-service.service';

@Component({
  selector: 'app-ui-grid-config',
  templateUrl: './ui-grid-config.component.html',
  styleUrls: ['./ui-grid-config.component.scss']
})
export class UiGridConfigComponent implements OnInit {

  gridEnabled$: Observable<boolean>;
  gridColumnWidth$: Observable<number>;
  gridColor$: Observable<string>;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private gridService: UiGridServiceService) {
      this.gridEnabled$ = this.gridService.gridConfig$.pipe(map(x => x.gridLines.enabled));
      this.gridColumnWidth$ = this.gridService.gridConfig$.pipe(map(x => x.gridCellSize.width));
      this.gridColor$ = this.gridService.gridConfig$.pipe(map(x => x.gridLines.color));
    }

  ngOnInit() {

  }

  showGridChanged(ev: { checked: boolean }) {

    this.gridService.toggleGrid(ev.checked);
  }

  sliderChanged(ev: {value: number, event: any}) {
    this.gridService.setGridColumnWidth(ev.value);
  }

  inputChanged(ev: {value: number, originalEvent: any}) {
    this.gridService.setGridColumnWidth(ev.value);
  }

  colorChanged(ev: {value: string, originalEvent: any}) {
    this.gridService.setGridColor(ev.value);
  }

  changeGridSize(newSize: number) {

  }

}
