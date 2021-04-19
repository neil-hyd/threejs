/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UiGridHelperComponent } from './ui-grid-helper.component';

describe('UiGridHelperComponent', () => {
  let component: UiGridHelperComponent;
  let fixture: ComponentFixture<UiGridHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiGridHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiGridHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
