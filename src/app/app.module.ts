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
import { DragDropModule } from '@angular/cdk/drag-drop'


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { UiGridModule } from './ui/ui-grid/ui-grid.module';

declare var cv: any;
@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
    UiComponent,
    UiItemComponent,
    UiJogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    WebcamModule,
    DragDropModule,
    UiGridModule,
    StoreModule.forRoot({ }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
