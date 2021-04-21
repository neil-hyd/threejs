import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-ui-jog',
  templateUrl: './ui-jog.component.html',
  styleUrls: ['./ui-jog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiJogComponent implements AfterViewInit, OnDestroy {

  @ViewChild('segments', {static: true})
  public segmentsGroup: ElementRef<SVGGElement>;

  private radiansConv = (Math.PI / 180);

  private frameId: any;
  private animationSpeed = .005;

  private numSegments = 120;

  private width = 200;
  private height = 200;
  private innerRadius = 180;
  private outerRadius = 200;
  private padAngle = .05;
  private padRadius = 150;
  private cornerRadius = 0;

  private rotation = 45;

  mousePos = [0, 0];
  public segment = '';

  touch = {
    x: 0,
    y: 0
  };

  public constructor(
    private ngZone: NgZone,
    private elRef: ElementRef<HTMLElement>) {
  }

  ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  ngAfterViewInit() {

    this.animate();

    const c = d3.select(this.segmentsGroup.nativeElement);

    const arcGenerator = d3.arc()
      .innerRadius(180)
      .outerRadius(220)
      .padAngle(.01)
      .padRadius(75)
      .cornerRadius(1);

    const arcData = this.generateArcSegmentData();

    c.selectAll('path')
      .data(arcData)
      .enter()
      .append('path')
      .attr('fill', 'white')
      .attr('d', arcGenerator);
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

    for (let arc = 0; arc < this.numSegments; arc++) {
      const startAngle = moment * arc;
      const endAngle = startAngle + moment;
      data.push({startAngle, endAngle});
    }

    return data;
  }
}
