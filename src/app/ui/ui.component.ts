import {Component, OnInit} from '@angular/core';
import { EngineService } from '../engine/engine.service';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html'
})
export class UiComponent implements OnInit {

  animationSpeed = .0001;

  public constructor(private engServ: EngineService) {
  }

  public ngOnInit(): void {
    this.animationSpeed = this.engServ.animationSpeed;
  }

  public rangeChanged(ev: InputEvent, el: HTMLInputElement)
  {
    this.animationSpeed = parseFloat(el.value);
    this.engServ.animationSpeed = this.animationSpeed;
  }
}
