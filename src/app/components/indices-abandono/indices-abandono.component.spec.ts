import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicesAbandonoComponent } from './indices-abandono.component';

describe('IndicesAbandonoComponent', () => {
  let component: IndicesAbandonoComponent;
  let fixture: ComponentFixture<IndicesAbandonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicesAbandonoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicesAbandonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
