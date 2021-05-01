import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { UiJogComponent } from './ui-jog.component';
import { UiJogService } from './services/ui-jog.service';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    UiJogService
  ],
  declarations: [
    UiJogComponent
  ],
  exports: [
    UiJogComponent
  ]
})
export class UiJogModule { }
