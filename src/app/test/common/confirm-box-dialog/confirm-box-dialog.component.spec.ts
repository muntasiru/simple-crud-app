import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBoxDialogComponent } from './confirm-box-dialog.component';

describe('ConfirmBoxDialogComponent', () => {
  let component: ConfirmBoxDialogComponent;
  let fixture: ComponentFixture<ConfirmBoxDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmBoxDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBoxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
