import {Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResizeService } from './services/resize.service';
import { createLayout, setActiveLayout, updateLayout } from './store/app.actions';
import { selectActiveLayout, selectLayoutState } from './store/app.selector';
import { UIGridItemState, UIGridState } from './ui/ui-grid/store/ui-grid.model';

type DashboardItemType = 'jog' | 'engine';

interface DashboardItem {
  type: DashboardItemType;
  position: UIGridItemState;
}

interface GridLayout {
  layout: UIGridState;
  items: DashboardItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ResizeService]
})
export class AppComponent {

  items: DashboardItem[] = [{
    position: {
      height: 8,
      width: 8,
      x: 4,
      y: 4
    },
    type: 'jog'
  }, {
    position: {
      height: 5,
      width: 5,
      x: 15,
      y: 4
    },
    type: 'engine'
  }];

  menuItems: Observable<MenuItem[]>;

  activeLayout$ = this.store.select(selectActiveLayout);

  constructor(private store: Store, private resizeService: ResizeService) {

    this.menuItems = this.store.select(selectLayoutState).pipe(map(appState => {
        const menuItems: MenuItem[] = [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            command: (event) => {
              this.store.dispatch(createLayout({id: Date.now().toString(), name: 'New Layout'}));
            }
          },
          {
            label: 'Layouts',
            icon: 'pi pi-fw pi-minus',
            items: appState.layouts.map(x => {
              return {
                label: x.name,
                icon: 'pi pi-fw pi-page',
                command: (event) => {
                  this.store.dispatch(setActiveLayout({id: x.id}));
                }
              };
            })
          }
        ];
        return menuItems;
      })
    );
    this.resizeService.resize.next();
  }

  gridChanged(layout: UIGridState) {
    this.store.dispatch(updateLayout({ grid: layout }));
    this.resizeService.resize.next();
  }
}
