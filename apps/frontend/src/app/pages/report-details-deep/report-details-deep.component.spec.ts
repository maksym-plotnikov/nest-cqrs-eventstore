import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailsDeepComponent } from './report-details-deep.component';

describe('ReportDetailsDeepComponent', () => {
  let component: ReportDetailsDeepComponent;
  let fixture: ComponentFixture<ReportDetailsDeepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDetailsDeepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailsDeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
