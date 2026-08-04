export interface Producto {

  id_producto?: number;

  nombre: string;

  descripcion?: string;

  precio: number;

  stock: number;

  disponible: boolean;

  estado?: string;

  fecha_creacion?: string;

  imagen?: string;

}