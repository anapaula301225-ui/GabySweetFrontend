import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetallePedido } from './admin-detalle-pedido';

describe('AdminDetallePedido', () => {
  let component: AdminDetallePedido;
  let fixture: ComponentFixture<AdminDetallePedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDetallePedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetallePedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
