import {Component, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import { ResizeService } from '../services/resize.service';
import {EngineService} from './engine.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements AfterViewInit {

  @ViewChild('cameraView', {static: true})
  public cameraView: ElementRef<HTMLDivElement>;

  @ViewChild('overView', {static: true})
  public overView: ElementRef<HTMLDivElement>;

  public constructor(
    private engServ: EngineService,
    private elRef: ElementRef<HTMLElement>,
    private resizeService: ResizeService) {

      this.resizeService.resize$.subscribe(x => {
        this.engServ.setSize(this.elRef.nativeElement.clientWidth, this.elRef.nativeElement.clientHeight);
      });
  }

  public ngAfterViewInit(): void {
    this.engServ.createScene(this.overView, this.cameraView);
    this.engServ.animate();
  }
}
