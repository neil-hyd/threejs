import { trigger, group, animate, transition, style, state, keyframes } from '@angular/animations';
import { Point } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs';
import { ResizeService } from 'src/app/services/resize.service';
import { AngleBetweenPoints, AngleToValue, NormalisedPoint, ValueToAngle } from './pipes/angle-to-value.pipe';
import { ActiveInputState } from './store/ui-jog.model';

const ZERO_POINT: Point = {x: 0, y: 0};

const HALF_PI = Math.PI / 2;

export interface ArcSegment {
  path: string;
  index: number;
  active: boolean;
}


@Component({
  selector: 'app-ui-jog',
  templateUrl: './ui-jog.component.html',
  styleUrls: ['./ui-jog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('activeAnim', [
      state('true', style({ fill: '#333', stroke: '#333', fillOpacity: 1 })),
      state('false', style({ fill: 'white', stroke: '#ccc', fillOpacity: .1 })),
      transition('true => false',
        group([
          animate('2s ease-out', style({ fillOpacity: .1, stroke: '#ccc' })),
          animate('2s ease-out', keyframes([
            style({ fill: '#ff2400', fillOpacity: .9 }),
            style({ fill: '#e81d1d', fillOpacity: .8 }),
            style({ fill: '#e8b71d', fillOpacity: .7 }),
            style({ fill: '#e3e81d', fillOpacity: .6 }),
            style({ fill: '#1de840', fillOpacity: .5 }),
            style({ fill: '#1ddde8', fillOpacity: .35 }),
            style({ fill: '#2b1de8', fillOpacity: .2 }),
            style({ fill: '#dd00f3', fillOpacity: .1 }),
            style({ fill: '#dd00f3', fillOpacity: .01 })
          ])
        )
      ])
    )]
  )]
})
export class UiJogComponent implements AfterViewInit, OnDestroy {

  @ViewChild('segments', {static: true})

  public segmentsGroup: ElementRef<SVGGElement>;

  private radiansConv = (Math.PI / 180);

  private frameId: any;

  private numSegments = 100;
  private width: number;
  private height: number;

  centerOffset: Point;


  private arcWidth: number;
  private innerRadius: number;
  private outerRadius: number;
  private arcCenter: number;

  value = new BehaviorSubject<number>(0);
  value$ = this.value.asObservable();

  active = false;

  startState?: ActiveInputState;
  lastState?: ActiveInputState;
  thisState?: ActiveInputState;

  arcSegments: ArcSegment[];

  knob?: Point;

  public constructor(
    private ngZone: NgZone,
    private changeRef: ChangeDetectorRef,
    private elRef: ElementRef<HTMLElement>,
    private resizeService: ResizeService) {

      this.inputMove = this.inputMove.bind(this);
      this.inputEnd = this.inputEnd.bind(this);

      this.arcWidth = Math.PI * 2 / this.numSegments;
  }

  ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  ngAfterViewInit() {

    this.resizeService.resize$.subscribe(x => {
      const {clientHeight, clientWidth} = this.elRef.nativeElement;
      this.width = clientWidth;
      this.height = clientHeight;
      this.centerOffset = { x: this.height / 2, y: this.width / 2 };
      this.drawSegments();
      this.changeRef.markForCheck();
    });

    this.elRef.nativeElement.addEventListener('pointerdown', (ev) => {
      this.inputStart(ev);
    });

    this.value$.subscribe((value) => {

      const radius = .75 * this.width / 2;
      const angle = this.arcWidth * value;

      this.knob = {
        x: radius *  Math.cos(angle - HALF_PI),
        y: radius *  Math.sin(angle - HALF_PI)
      };
    });
  }

  getInputState(event: PointerEvent): ActiveInputState {

    const rawPoint: Point = {
      x: event.offsetX,
      y: event.offsetY
    };

    const normalisedPoint = NormalisedPoint(rawPoint, this.centerOffset);
    return {
      event,
      angle: AngleBetweenPoints(ZERO_POINT, normalisedPoint),
      normalisedPoint,
      rawPoint,
    };
  }

  inputStart(event: PointerEvent) {

    this.elRef.nativeElement.addEventListener('pointermove', this.inputMove);
    this.elRef.nativeElement.addEventListener('pointercancel', this.inputEnd);
    this.elRef.nativeElement.addEventListener('pointerup', this.inputEnd);

    this.startState = this.getInputState(event);
    this.lastState = this.startState;
    this.thisState = this.startState;

    this.updateUi();

    this.active = true;

    this.changeRef.detach();
    this.changeRef.detectChanges();
  }

  inputMove(event: PointerEvent) {

    this.lastState = this.thisState;
    this.thisState = this.getInputState(event);

    this.updateUi();

    this.changeRef.detectChanges();
  }

  updateUi() {

    const value = AngleToValue(this.thisState.angle, this.numSegments);
    this.value.next(value);

    const angleForValue = ValueToAngle(value, this.numSegments) + HALF_PI;

    this.knob = {
      x: this.arcCenter * Math.sin(angleForValue),
      y: this.arcCenter * Math.cos(angleForValue)
    };
  }

  inputEnd(event: PointerEvent) {

    this.active = false;

    this.elRef.nativeElement.removeEventListener('pointermove', this.inputMove);
    this.elRef.nativeElement.removeEventListener('pointercancel', this.inputEnd);
    this.elRef.nativeElement.removeEventListener('pointerup', this.inputEnd);

    this.changeRef.reattach();
    this.changeRef.detectChanges();
  }

  drawSegments() {

    const c = d3.select(this.segmentsGroup.nativeElement);

    const minDimension = Math.min(this.height / 2, this.width / 2);

    this.innerRadius = minDimension * .7;
    this.outerRadius = minDimension * .9;
    this.arcCenter = this.outerRadius - ((this.outerRadius - this.innerRadius) / 2);

    const arcGenerator = d3.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius)
      .padAngle(this.arcWidth / this.numSegments)
      .cornerRadius(0);

    const arcData = this.generateArcSegmentData();

    this.arcSegments = arcData.map<ArcSegment>((d, index) => {
      const arc = arcGenerator(d);
      return {
        path: arc,
        index,
        active: index === 0
      };
    });

    console.log(this.arcSegments);
  }

  public animate() {
    this.frameId = requestAnimationFrame(() => {
      this.ngZone.runOutsideAngular(() => {
        this.render();
      });
    });
  }

  render() {
    // this.tick++;
  }

  generateArcSegmentData() {

    const data = [];
    const moment = 360 / this.numSegments * this.radiansConv;
    const halfMoment = moment / 2;

    const offset = -Math.PI / 2;

    for (let arc = 0; arc < this.numSegments; arc++) {
      const startAngle = (moment * arc) - halfMoment + offset;
      const endAngle = startAngle + moment;
      data.push({startAngle: -startAngle, endAngle: -endAngle});
    }

    return data;
  }
}
