import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTabComponent } from './partner-tab.component';

describe('PartnerTabComponent', () => {
  let component: PartnerTabComponent;
  let fixture: ComponentFixture<PartnerTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
