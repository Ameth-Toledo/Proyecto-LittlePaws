import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWarningComponent } from './modal-warning.component';

describe('ModalWarningComponent', () => {
  let component: ModalWarningComponent;
  let fixture: ComponentFixture<ModalWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalWarningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
