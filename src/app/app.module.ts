import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {EngineComponent} from './engine/engine.component';
import { UiItemComponent } from './ui/ui-item/ui-item.component';
import { UiJogComponent } from './ui/ui-jog/ui-jog.component';
import {UiComponent} from './ui/ui.component';
import {WebcamModule} from 'ngx-webcam';
import { UiGridComponent } from './ui/ui-grid/ui-grid.component';
import { UiGridItemComponent } from './ui/ui-grid-item/ui-grid-item.component';
import { UiGridHelperComponent } from './ui/ui-grid/helpers/ui-grid-helper/ui-grid-helper.component';
import { DragDropModule } from '@angular/cdk/drag-drop'

declare var cv: any;
@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
    UiComponent,
    UiItemComponent,
    UiJogComponent,
    UiGridComponent,
    UiGridItemComponent,
    UiGridHelperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    WebcamModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
