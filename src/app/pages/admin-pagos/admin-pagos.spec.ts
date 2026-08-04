import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPagos } from './admin-pagos';

describe('AdminPagos', () => {
  let component: AdminPagos;
  let fixture: ComponentFixture<AdminPagos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPagos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPagos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
