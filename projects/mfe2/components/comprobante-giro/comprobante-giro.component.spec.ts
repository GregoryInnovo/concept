import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteGiroComponent } from './comprobante-giro.component';

describe('ComprobanteGiroComponent', () => {
  let component: ComprobanteGiroComponent;
  let fixture: ComponentFixture<ComprobanteGiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprobanteGiroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprobanteGiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
