import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiarioGiroComponent } from './beneficiario-giro.component';

describe('BeneficiarioGiroComponent', () => {
  let component: BeneficiarioGiroComponent;
  let fixture: ComponentFixture<BeneficiarioGiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiarioGiroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiarioGiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
