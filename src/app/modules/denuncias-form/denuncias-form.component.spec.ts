import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciasFormComponent } from './denuncias-form.component';

describe('DenunciasFormComponent', () => {
  let component: DenunciasFormComponent;
  let fixture: ComponentFixture<DenunciasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenunciasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
