export interface Pedido {


id_pedido:number;

fecha_pedido:string;

estado:string;

total:number;

tipo_entrega:string;

direccion_entrega?:string;

telefono_contacto?:string;

observaciones?:string;


}