import { trigger, group, animate, transition, style, state, keyframes } from '@angular/animations';
import { Point } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, NgZone, OnDestroy, Output, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { DefaultArcObject } from 'd3';
import { BehaviorSubject } from 'rxjs';
import { ResizeService } from 'src/app/services/resize.service';
import { AngleBetweenPoints, AngleToValue, NormalisedPoint, ValueToAngle } from './pipes/angle-to-value.pipe';
import { ActiveInputState, EDirection } from './store/ui-jog.model';

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
      state('false', style({ stroke: '#ccc', fillOpacity: .1, transform: 'scale(1)'})),
      state('true', style({ stroke: '#ccc', fill: '#ccc', fillOpacity: 1, transform: 'scale(1.1)'})),
      transition('* => true', [
        style({ fill: '#ccc', fillOpacity: 1, transform: 'scale(1.1)' })
      ]),
      transition('true => false',
        group([
          animate('1s ease-out', style({ transform: 'scale(1)' })),
          animate('2s ease-out', style({ fillOpacity: .1 })),
          animate('2s ease-out', keyframes([
            style({ fill: '#ff2400' }),
            style({ fill: '#e81d1d' }),
            style({ fill: '#e8b71d' }),
            style({ fill: '#e3e81d' }),
            style({ fill: '#1de840' }),
            style({ fill: '#1ddde8' }),
            style({ fill: '#2b1de8' }),
            style({ fill: '#dd00f3' }),
            style({ fill: '#dd00f3' })
          ])
        )
      ])
    )]
  )]
})
export class UiJogComponent implements AfterViewInit, OnDestroy {

  @ViewChild('segments', {static: true})

  public segmentsGroup: ElementRef<SVGGElement>;

  private frameId: any;

  direction: EDirection = EDirection.clockwise;
  offset = 0;
  private numSegments = 100;
  private width: number;
  private height: number;
  knobSize = 20;

  centerOffset: Point;

  private arcWidth: number;
  private innerRadius: number;
  private outerRadius: number;
  private arcCenter: number;

  @Input()
  set v(newValue: number) {
    this._value.next(newValue);
  }

  private _value = new BehaviorSubject<number>(452);

  @Output()
  value$ = this._value.asObservable();

  @HostBinding('class.active')
  active = false;

  startState?: ActiveInputState;
  lastState?: ActiveInputState;
  thisState?: ActiveInputState;

  arcSegments: ArcSegment[] = [];
  ticks: {p1: Point, p2: Point, index: number}[] = [];

  activeSegments: number[] = [];

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

    this.elRef.nativeElement.addEventListener('pointerdown', (ev) => {
      this.inputStart(ev);
    });

    setTimeout(() => {
      this.updateSize();
      this.updateUi(true);
      this.changeRef.detectChanges();
    }, 300);
  }

  updateSize() {
    const {clientHeight, clientWidth} = this.elRef.nativeElement;
    this.width = clientWidth;
    this.height = clientHeight;
    this.centerOffset = { x: this.height / 2, y: this.width / 2 };
    this.knobSize = this.width * .1;
    this.drawSegments();
  }

  getInputState(event: PointerEvent): ActiveInputState {

    const rawPoint: Point = {
      x: event.offsetX,
      y: event.offsetY
    };

    const normalisedPoint = NormalisedPoint(rawPoint, this.centerOffset);
    let angle = AngleBetweenPoints(ZERO_POINT, normalisedPoint);

    angle = ((Math.PI / 2) - angle) - this.offset;

    while (angle < -Math.PI) {
      angle += Math.PI * 2;
    }
    while (angle > Math.PI) {
      angle -= Math.PI * 2;
    }

    return {
      event,
      angle,
      normalisedPoint,
      rawPoint,
      index: AngleToValue(angle, this.numSegments, this.direction, this.offset)
    };
  }

  inputStart(event: PointerEvent) {

    if (this.active) {
      return;
    }

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

    if (event.pointerId !== this.startState.event.pointerId) {
      return;
    }

    this.lastState = this.thisState;
    this.thisState = this.getInputState(event);

    this.updateUi();

    this.changeRef.detectChanges();
  }

  inputEnd(event: PointerEvent) {

    if (event.pointerId !== this.startState.event.pointerId) {
      return;
    }

    this.active = false;

    this.elRef.nativeElement.removeEventListener('pointermove', this.inputMove);
    this.elRef.nativeElement.removeEventListener('pointercancel', this.inputEnd);
    this.elRef.nativeElement.removeEventListener('pointerup', this.inputEnd);

    this.changeRef.reattach();
    this.changeRef.detectChanges();
  }

  wrapped(v: number) {
    if (v >= this.numSegments) {
      const r = v % this.numSegments;
      return r;
    } else if (v < 0) {
      const r = v % this.numSegments;
      return r === 0 ? r : this.numSegments + r;
    }
    return v;
  }

  updateUi(force = false) {

    let lastIndex = force ? 0 : this.lastState.index;
    let thisIndex = force ? 0 : this.thisState.index;

    if (!force && lastIndex === thisIndex) {
      return;
    }

    let dif = lastIndex - thisIndex;
    let half = this.numSegments / 2;

    if (dif > half) {
      dif = -(this.numSegments - dif);
    } else if (dif < -half) {
      dif = this.numSegments + dif;
    }

    let steps = Math.abs(dif);

    this.activeSegments = [];

    const lastValue = this._value.value;
    const nextValue = this._value.value - dif;

    const lm = this.wrapped(lastValue);
    const nm = this.wrapped(nextValue);

    this._value.next(nextValue);

    const radius = .6 * this.width / 2;
    const angle = this.arcWidth * nm;

    this.knob = {
      x: radius *  Math.cos(angle - HALF_PI),
      y: radius *  Math.sin(angle - HALF_PI)
    };

    if (dif === 1 || dif === 0 || dif === -1) {
      this.activeSegments = [nm];
    } else if (dif < -1) {
      for (let i = 1; i <= steps; i++) {
        let v = lm + i;

        if (v < 0) {
          v = this.numSegments - v
        } else if (v > this.numSegments) {
          v = v - this.numSegments
        }

        if (v === this.numSegments) {
          v = 0;
        }

        this.activeSegments.push(v);
      }
    } else {
      for (let i = 0; i <= steps; i++) {
        let v = lm - i;
        if (v < 0) {
          v = this.numSegments + v
        } else if (v > this.numSegments) {
          v = v - this.numSegments
        }

        if (v === this.numSegments) {
          v = 0;
        }
        this.activeSegments.push(v);
      }
    }

  }

  drawSegments() {

    const c = d3.select(this.segmentsGroup.nativeElement);

    const minDimension = Math.min(this.height / 2, this.width / 2);

    this.innerRadius = minDimension * .6;
    this.outerRadius = minDimension * .9;
    this.arcCenter = minDimension * .6;

    const arcGenerator = d3.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius)
      .padAngle(this.arcWidth / this.numSegments)
      .cornerRadius(0);

    const arcData = this.generateArcSegmentData();

    const dif = this.direction === EDirection.clockwise ? -(this.arcWidth / 2) : (this.arcWidth / 2);
    this.ticks.length = 0;
    this.arcSegments = arcData.map<ArcSegment>((d, index) => {

      const midAngle = d.startAngle - dif - (Math.PI / 2);

      let length = 3;
      if ((index) % 5 === 0) {
        length = 8;
      }
      if ((index) % 10 === 0) {
        length = 15;
      }

      this.ticks.push({
        p1: {
          x: this.outerRadius * Math.cos(midAngle),
          y: this.outerRadius * Math.sin(midAngle)
        },
        p2: {
          x: (this.outerRadius + length) * Math.cos(midAngle),
          y: (this.outerRadius + length) * Math.sin(midAngle)
        },
        index
      });

      const arc = arcGenerator(d);

      return {
        path: arc,
        index,
        active: index === 0
      };
    });
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

  generateArcSegmentData(): DefaultArcObject[] {

    const data = [];
    const moment = Math.PI * 2 / this.numSegments;
    const halfMoment = moment / 2;

    let dif = moment;

    let curAngle = this.offset - halfMoment;

    if (this.direction === EDirection.anticlockwise) {
      curAngle = this.offset + halfMoment;
      dif = -moment
    }

    let endAngle = curAngle + dif;

    for (let arc = 0; arc < this.numSegments; arc++) {
      data.push({startAngle: curAngle, endAngle: endAngle});
      curAngle = endAngle;
      endAngle = endAngle + dif;
    }

    return data;
  }
}
