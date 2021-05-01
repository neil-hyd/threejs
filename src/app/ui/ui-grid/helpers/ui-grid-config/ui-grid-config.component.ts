import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Size } from 'src/app/ui/data/shared.model';
import { UIGridStore } from '../../store/ui-grid.store';

@Component({
  selector: 'app-ui-grid-config',
  templateUrl: './ui-grid-config.component.html',
  styleUrls: ['./ui-grid-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiGridConfigComponent {

  sidebarVisible = false;

  enabled$: Observable<boolean>;
  size$: Observable<Size>;
  color$: Observable<string>;
  opacity$: Observable<number>;
  name$: Observable<string>;

  constructor(
    private store: UIGridStore) {
      this.enabled$ = this.store.gridLineEnabled$;
      this.size$ = this.store.gridCellSize$;
      this.color$ = this.store.gridLineColor$;
      this.opacity$ = this.store.gridLineOpacity$;
      this.name$ = this.store.gridName$;
    }

  showGridChanged(ev: { checked: boolean }) {
    this.store.toggleGridLines(ev.checked);
  }

  sliderChanged(ev: {value: number, event: any}) {
    this.store.setGridCellSize({width: ev.value, height: ev.value});
  }

  inputChanged(ev: {value: number, originalEvent: any}) {
    this.store.setGridCellSize({width: ev.value, height: ev.value});
  }

  colorChanged(ev: {value: string, originalEvent: any}) {
    this.store.setGridLineColor(ev.value);
  }

  changeGridSize(newSize: number) {

  }
}
