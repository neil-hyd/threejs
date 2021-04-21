import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Size, UIGrid } from '../data/grid.model';
import { setViewportSize } from './ui-grid.actions';
import { AppState, gridCellSize, gridSize } from './ui-grid.selector';

@Component({
  selector: 'app-ui-grid',
  templateUrl: './ui-grid.component.html',
  styleUrls: ['./ui-grid.component.scss']
})
export class UiGridComponent implements AfterViewInit {

  count$: Observable<number>;


  gridCellSize: Observable<Size>;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private store: Store<AppState>) {

      this.store.select(gridCellSize).subscribe(size => {
        this.elRef.nativeElement.style.gridAutoColumns = size.width + 'px';
        this.elRef.nativeElement.style.gridAutoRows = size.height + 'px';
      });
  }

  ngAfterViewInit() {

    this.gridCellSize = this.store.select(gridSize);

    const { clientWidth, clientHeight } = this.elRef.nativeElement;

    const size: Size = { width: clientWidth, height: clientHeight };
    this.store.dispatch(setViewportSize({ size }));
  }
}
