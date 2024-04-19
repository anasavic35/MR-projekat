import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PadelPage } from './padel.page';

describe('PadelPage', () => {
  let component: PadelPage;
  let fixture: ComponentFixture<PadelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PadelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
