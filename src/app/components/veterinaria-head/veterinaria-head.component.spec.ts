import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinariaHeadComponent } from './veterinaria-head.component';

describe('VeterinariaHeadComponent', () => {
  let component: VeterinariaHeadComponent;
  let fixture: ComponentFixture<VeterinariaHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinariaHeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinariaHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
