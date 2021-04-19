/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UiItemComponent } from './ui-item.component';

describe('UiItemComponent', () => {
  let component: UiItemComponent;
  let fixture: ComponentFixture<UiItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
