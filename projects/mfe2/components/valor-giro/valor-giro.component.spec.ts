import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorGiroComponent } from './valor-giro.component';

describe('ValorGiroComponent', () => {
  let component: ValorGiroComponent;
  let fixture: ComponentFixture<ValorGiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorGiroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorGiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
