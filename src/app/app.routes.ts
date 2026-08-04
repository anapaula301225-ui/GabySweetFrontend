import { Routes } from '@angular/router';


import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';


import { Productos } from './pages/productos/productos';
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';


import { Pedidos } from './pages/pedidos/pedidos';
import { DetallePedido } from './pages/detalle-pedido/detalle-pedido';


import { Pagos } from './pages/pagos/pagos';
import { Perfil } from './pages/perfil/perfil';



import { Dashboard } from './pages/dashboard/dashboard';


import { AdminProductos } from './pages/admin-productos/admin-productos';
import { AdminPedidos } from './pages/admin-pedidos/admin-pedidos';
import { AdminPagos } from './pages/admin-pagos/admin-pagos';

import { Auditoria } from './pages/auditoria/auditoria';

import { AdminDetallePedido } from './pages/admin-detalle-pedido/admin-detalle-pedido';
import { Carrito } from './pages/carrito/carrito';



export const routes: Routes = [



  // ==========================
  // PÚBLICO
  // ==========================


  {
    path: '',
    component: Home,
    title: 'Inicio | GabySweet'
  },



  {
    path: 'login',
    component: Login,
    title: 'Iniciar Sesión | GabySweet'
  },



  {
    path: 'register',
    component: Register,
    title: 'Crear Cuenta | GabySweet'
  },






  // ==========================
  // CLIENTE
  // ==========================



  {
    path: 'productos',
    component: Productos,
    title: 'Productos | GabySweet'
  },



  {
    path: 'producto/:id',
    component: DetalleProducto,
    title: 'Detalle Producto | GabySweet'
  },



  {
    path: 'carrito',
    component: Carrito,
    title: 'Carrito | GabySweet'
  },



  {
    path: 'pedidos',
    component: Pedidos,
    title: 'Mis Pedidos | GabySweet'
  },



  {
    path: 'pedido/:id',
    component: DetallePedido,
    title: 'Detalle Pedido | GabySweet'
  },



  {
    path: 'pagos',
    component: Pagos,
    title: 'Pagos | GabySweet'
  },



  {
    path: 'perfil',
    component: Perfil,
    title: 'Mi Perfil | GabySweet'
  },









  // ==========================
  // ADMINISTRACIÓN
  // ==========================



  {
    path: 'dashboard',
    component: Dashboard,
    title: 'Dashboard | GabySweet'
  },





  // IMPORTANTE:
  // Esta ruta debe ir antes que admin/productos

  {
    path: 'admin/productos/:id',
    component: AdminProductos,
    title: 'Editar Producto | GabySweet'
  },



  {
    path: 'admin/productos',
    component: AdminProductos,
    title: 'Administrar Productos | GabySweet'
  },



  {
    path: 'admin/pedidos',
    component: AdminPedidos,
    title: 'Administrar Pedidos | GabySweet'
  },



  {
    path: 'admin/pedido/:id',
    component: AdminDetallePedido,
    title: 'Detalle Pedido Administración | GabySweet'
  },



  {
    path: 'admin/pagos',
    component: AdminPagos,
    title: 'Administrar Pagos | GabySweet'
  },



  {
    path: 'admin/auditoria',
    component: Auditoria,
    title: 'Auditoría | GabySweet'
  },






  // ==========================
  // RUTA NO ENCONTRADA
  // ==========================



  {
    path: '**',
    redirectTo: ''
  }



];