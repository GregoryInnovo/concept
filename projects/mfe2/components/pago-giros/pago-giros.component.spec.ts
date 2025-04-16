import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoGirosComponent } from './pago-giros.component';

describe('PagoGirosComponent', () => {
  let component: PagoGirosComponent;
  let fixture: ComponentFixture<PagoGirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoGirosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoGirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
