/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UiJogService } from './ui-jog.service';

describe('Service: UiJog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiJogService]
    });
  });

  it('should ...', inject([UiJogService], (service: UiJogService) => {
    expect(service).toBeTruthy();
  }));
});
