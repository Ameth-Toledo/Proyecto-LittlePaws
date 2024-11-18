import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateVeterinariaComponent } from './template-veterinaria.component';

describe('TemplateVeterinariaComponent', () => {
  let component: TemplateVeterinariaComponent;
  let fixture: ComponentFixture<TemplateVeterinariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateVeterinariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateVeterinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
