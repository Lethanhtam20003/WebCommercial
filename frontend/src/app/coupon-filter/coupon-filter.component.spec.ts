import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponFilterComponent } from './coupon-filter.component';

describe('CouponFilterComponent', () => {
  let component: CouponFilterComponent;
  let fixture: ComponentFixture<CouponFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
