import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  resize = new Subject();

  constructor() { }

  get resize$() {
    return this.resize.asObservable();
  }
}
