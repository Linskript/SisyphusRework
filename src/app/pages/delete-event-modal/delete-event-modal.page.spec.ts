import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteEventModalPage } from './delete-event-modal.page';

describe('DeleteEventModalPage', () => {
  let component: DeleteEventModalPage;
  let fixture: ComponentFixture<DeleteEventModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEventModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
