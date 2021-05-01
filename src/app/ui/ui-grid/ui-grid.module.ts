import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiGridComponent } from './ui-grid.component';
import { UiGridConfigComponent } from './helpers/ui-grid-config/ui-grid-config.component';
import { UiGridHelperComponent } from './helpers/ui-grid-helper/ui-grid-helper.component';
import { UiGridItemComponent } from './ui-grid-item/ui-grid-item.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    OverlayPanelModule,
    CheckboxModule,
    ButtonModule,
    SliderModule,
    InputNumberModule,
    ColorPickerModule,
    SidebarModule
  ],
  declarations: [
    UiGridComponent,
    UiGridItemComponent,
    UiGridHelperComponent,
    UiGridConfigComponent
  ],
  exports: [
    UiGridComponent,
    UiGridItemComponent
  ]
})
export class UiGridModule { }
