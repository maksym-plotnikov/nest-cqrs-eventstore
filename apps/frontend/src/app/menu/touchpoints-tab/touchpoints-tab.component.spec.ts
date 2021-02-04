import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchpointsTabComponent } from './touchpoints-tab.component';

describe('TouchpointsTabComponent', () => {
  let component: TouchpointsTabComponent;
  let fixture: ComponentFixture<TouchpointsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouchpointsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchpointsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
