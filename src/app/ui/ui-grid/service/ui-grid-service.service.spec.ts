/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UiGridServiceService } from './ui-grid-service.service';

describe('Service: UiGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiGridServiceService]
    });
  });

  it('should ...', inject([UiGridServiceService], (service: UiGridServiceService) => {
    expect(service).toBeTruthy();
  }));
});
