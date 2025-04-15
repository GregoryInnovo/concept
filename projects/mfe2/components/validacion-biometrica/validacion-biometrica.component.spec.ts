import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionBiometricaComponent } from './validacion-biometrica.component';

describe('ValidacionBiometricaComponent', () => {
  let component: ValidacionBiometricaComponent;
  let fixture: ComponentFixture<ValidacionBiometricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidacionBiometricaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidacionBiometricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
