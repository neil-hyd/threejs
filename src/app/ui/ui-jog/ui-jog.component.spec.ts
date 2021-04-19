/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UiJogComponent } from './ui-jog.component';

describe('UiJogComponent', () => {
  let component: UiJogComponent;
  let fixture: ComponentFixture<UiJogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiJogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiJogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
