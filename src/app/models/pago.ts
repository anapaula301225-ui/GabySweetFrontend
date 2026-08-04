export interface Pago {

  id_pago?: number;

  id_pedido: number;

  metodo_pago: 'YAPE' | 'PLIN';

  monto: number;

  estado?: string;

  codigo_operacion: string;

  codigo_seguridad?: string;

  fecha_pago?: string;

  fecha_confirmacion?: string;

  archivo?: string;

}