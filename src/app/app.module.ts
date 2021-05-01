import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {EngineComponent} from './engine/engine.component';
import {UiComponent} from './ui/ui.component';
import {WebcamModule} from 'ngx-webcam';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { UiGridModule } from './ui/ui-grid/ui-grid.module';
import { IAppState } from './store/app.model';
import { appLayoutReducer } from './store/app.reducers';
import { UiJogModule } from './ui/ui-jog/ui-jog.module';

declare var cv: any;
@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
    UiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    WebcamModule,
    DragDropModule,
    TieredMenuModule,
    ButtonModule,
    UiGridModule,
    UiJogModule,
    StoreModule.forRoot<IAppState>({ layout: appLayoutReducer }),
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
