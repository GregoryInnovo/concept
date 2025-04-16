import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnulacionGirosComponent } from './anulacion-giros.component';

describe('AnulacionGirosComponent', () => {
  let component: AnulacionGirosComponent;
  let fixture: ComponentFixture<AnulacionGirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnulacionGirosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnulacionGirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
