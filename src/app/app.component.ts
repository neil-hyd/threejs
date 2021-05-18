import { AfterViewInit, Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { ResizeService } from './services/resize.service';
import { updateFOV } from './store/app.actions';
import { selectActiveLayout, selectFOV } from './store/app.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ResizeService]
})
export class AppComponent implements AfterViewInit {

  activeLayout$ = this.store.select(selectActiveLayout);

  fov$ = this.store.select(selectFOV);

  constructor(private store: Store, private resizeService: ResizeService) {

  }

  ngAfterViewInit() {
    this.resizeService.resize.next();
  }

  newValue(newValue: number) {
    this.store.dispatch(updateFOV({fov: newValue}));
  }
}

