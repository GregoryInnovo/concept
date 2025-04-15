import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaGiroComponent } from './consulta-giro.component';

describe('ConsultaGiroComponent', () => {
  let component: ConsultaGiroComponent;
  let fixture: ComponentFixture<ConsultaGiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaGiroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaGiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
