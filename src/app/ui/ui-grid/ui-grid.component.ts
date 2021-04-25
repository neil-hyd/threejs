import { AfterViewInit, Component, ElementRef, Input, Output } from '@angular/core';
import { Size } from '../data/shared.model';
import { UIGridState } from './store/ui-grid.model';
import { UIGridStore } from './store/ui-grid.store';

@Component({
  selector: 'app-ui-grid',
  templateUrl: './ui-grid.component.html',
  styleUrls: ['./ui-grid.component.scss'],
  providers: [UIGridStore]
})
export class UiGridComponent implements AfterViewInit {

  @Input() gridState: UIGridState;
  @Output() gridStateChanged$ = this.store.gridState$;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private store: UIGridStore) {
  }

  ngAfterViewInit() {

    this.store.gridCellSize$.subscribe(size => {
      this.elRef.nativeElement.style.gridAutoColumns = size.width + 'px';
      this.elRef.nativeElement.style.gridAutoRows = size.height + 'px';
    });

    const { clientWidth, clientHeight } = this.elRef.nativeElement;

    const viewportSize: Size = { width: clientWidth, height: clientHeight };
    this.store.setViewportSize(viewportSize);
  }
}
