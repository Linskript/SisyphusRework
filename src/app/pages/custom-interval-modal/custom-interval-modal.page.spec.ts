import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomIntervalModalPage } from './custom-interval-modal.page';

describe('CustomIntervalModalPage', () => {
  let component: CustomIntervalModalPage;
  let fixture: ComponentFixture<CustomIntervalModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomIntervalModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
