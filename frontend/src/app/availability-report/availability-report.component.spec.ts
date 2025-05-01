import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityReportComponent } from './availability-report.component';

describe('AvailabilityReportComponent', () => {
  let component: AvailabilityReportComponent;
  let fixture: ComponentFixture<AvailabilityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilityReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailabilityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
