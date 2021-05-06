import { Point } from '@angular/cdk/drag-drop';
import { EDirection } from '../store/ui-jog.model';

export function AngleToValue(angle: number, segments: number, direction: EDirection, offset: number): number {

    if (angle < 0) {
      angle = (Math.PI * 2) + angle;
    }

    const arcPerent = angle / (Math.PI * 2);

    let v = Math.round(arcPerent * segments);

    if (direction === EDirection.anticlockwise) {
      v = segments - v;
    }

    if (v === segments) {
      v = 0;
    }

    return v;
}

export function ValueToAngle(value: number, segments: number, direction: EDirection, offset: number): number {

  const arc = Math.PI * 2 / segments;

  const v = arc * value;

  if (direction === EDirection.anticlockwise) {
    return v - Math.PI - offset;
  }

  return Math.PI - offset - v;
}

export function NormalisedPoint(point: Point, offset: Point): Point {
  return {
    x: point.x - offset.x,
    y: offset.y - point.y
  };
}


export function AngleBetweenPoints(pointA: Point, pointB: Point, pointC?: Point): any {
  if (pointC) {
    return find_angle(pointA, pointB, pointC);
  }
  return Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x);
}


function find_angle(A: Point, B: Point, C: Point) {
  const AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
  const BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
  const AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
}
