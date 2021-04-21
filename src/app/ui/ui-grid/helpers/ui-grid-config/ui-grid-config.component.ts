import { Component, ElementRef, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Size, UIGrid } from 'src/app/ui/data/grid.model';
import { Store } from '@ngrx/store';
import { AppState, gridCellSize, gridLineColor, gridLineEnabled, gridLineOpacity, gridSize } from '../../ui-grid.selector';
import { setGridLineColor, setGridCellSize, toggleGridLines } from '../../ui-grid.actions';


@Component({
  selector: 'app-ui-grid-config',
  templateUrl: './ui-grid-config.component.html',
  styleUrls: ['./ui-grid-config.component.scss']
})
export class UiGridConfigComponent implements OnInit {

  enabled$: Observable<boolean>;
  size$: Observable<Size>;
  color$: Observable<string>;
  opacity$: Observable<number>;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private store: Store<AppState>) {

      this.enabled$ = this.store.select(gridLineEnabled);
      this.size$ = this.store.select(gridCellSize);
      this.color$ = this.store.select(gridLineColor);
      this.opacity$ = this.store.select(gridLineOpacity);
    }

  ngOnInit() {

  }

  showGridChanged(ev: { checked: boolean }) {

    this.store.dispatch(toggleGridLines({ visible: ev.checked }));
  }

  sliderChanged(ev: {value: number, event: any}) {
    this.store.dispatch(setGridCellSize({ size: {width: ev.value, height: ev.value} }));
  }

  inputChanged(ev: {value: number, originalEvent: any}) {
    this.store.dispatch(setGridCellSize({ size: {width: ev.value, height: ev.value} }));
  }

  colorChanged(ev: {value: string, originalEvent: any}) {
    this.store.dispatch(setGridLineColor({ color: ev.value }));
  }

  changeGridSize(newSize: number) {

  }

}
