import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { UiGridConfigComponent } from './ui/ui-grid/helpers/ui-grid-config/ui-grid-config.component';
import {PanelModule} from 'primeng/panel';
import {CheckboxModule} from 'primeng/checkbox';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ButtonModule} from 'primeng/button';
import {SliderModule} from 'primeng/slider';
import {InputNumberModule} from 'primeng/inputnumber';
import {ColorPickerModule} from 'primeng/colorpicker';

import { StoreModule } from '@ngrx/store';
import { uiGridReducer } from './ui/ui-grid/ui-grid.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UIGridEffects } from './ui/ui-grid/ui-grid.effects';

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
    UiGridHelperComponent,
    UiGridConfigComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    WebcamModule,
    DragDropModule,
    PanelModule,
    OverlayPanelModule,
    CheckboxModule,
    ButtonModule,
    SliderModule,
    InputNumberModule,
    ColorPickerModule,
    StoreModule.forRoot({ uiGrid: uiGridReducer }),
    EffectsModule.forRoot([UIGridEffects])
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
