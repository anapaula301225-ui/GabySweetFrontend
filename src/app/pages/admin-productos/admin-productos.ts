
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import { ProductoService } from '../../services/producto';
import { Producto } from '../../models/producto';

import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './admin-productos.html',
  styleUrl: './admin-productos.css'
})
export class AdminProductos implements OnInit {

  private productoService = inject(ProductoService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  urlImagen =
    environment.apiUrl.replace('/api', '') + '/uploads/';

  productos: Producto[] = [];

  textoBusqueda = '';

  cargando = true;

  mostrarFormulario = false;

  modoEdicion = false;

  idProductoEditando: number | null = null;

  imagenSeleccionada: File | null = null;

  nombreImagen = '';


  productoForm = this.fb.group({

    nombre: [
      '',
      Validators.required
    ],

    descripcion: [
      ''
    ],

    precio: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    stock: [
      0,
      Validators.required
    ],

    disponible: [
      true
    ]

  });


  ngOnInit(): void {

    this.listarProductos();

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      if (id) {

        this.cargarProductoEditar(
          Number(id)
        );

      }

    });

  }


  // ==========================================
  // LISTAR PRODUCTOS
  // ==========================================

  listarProductos(): void {

    this.cargando = true;

    this.productoService.listar()
      .subscribe({

        next: (respuesta) => {

          this.productos =
            respuesta.data;

          this.cargando = false;

        },

        error: (error) => {

          console.error(
            'Error al listar productos:',
            error
          );

          this.cargando = false;

        }

      });

  }


  // ==========================================
  // CARGAR PRODUCTO PARA EDITAR
  // ==========================================

  cargarProductoEditar(id: number): void {

    this.productoService.obtener(id)
      .subscribe({

        next: (respuesta) => {

          console.log(
            'Producto obtenido para edición:',
            respuesta.data
          );

          this.editarProducto(
            respuesta.data
          );

        },

        error: (error) => {

          console.error(
            'Error al obtener producto:',
            error
          );

          Swal.fire({

            icon: 'error',

            title: 'Error',

            text: 'No se pudo cargar el producto.'

          });

        }

      });

  }


  // ==========================================
  // BUSCAR PRODUCTOS
  // ==========================================

  buscarProductos(): void {

    const nombre =
      this.textoBusqueda.trim();

    if (nombre === '') {

      this.listarProductos();

      return;

    }

    this.productoService.buscar(nombre)
      .subscribe({

        next: (respuesta) => {

          this.productos =
            respuesta.data;

        },

        error: (error) => {

          console.error(
            'Error al buscar productos:',
            error
          );

        }

      });

  }


  // ==========================================
  // ABRIR FORMULARIO NUEVO
  // ==========================================

  abrirFormulario(): void {

    this.mostrarFormulario = true;

    this.modoEdicion = false;

    this.idProductoEditando = null;

    this.imagenSeleccionada = null;

    this.nombreImagen = '';


    this.productoForm.reset({

      nombre: '',

      descripcion: '',

      precio: 0,

      stock: 0,

      disponible: true

    });

  }


  // ==========================================
  // EDITAR PRODUCTO
  // ==========================================

  editarProducto(producto: Producto): void {

    console.log(
      'Producto seleccionado para editar:',
      producto
    );


    // ------------------------------------------
    // VALIDAR PRODUCTO
    // ------------------------------------------

    if (
      !producto ||
      !producto.id_producto
    ) {

      console.error(
        'El producto no tiene id_producto:',
        producto
      );

      Swal.fire({

        icon: 'error',

        title: 'Producto',

        text:
          'No se pudo identificar el producto seleccionado.',

        confirmButtonColor: '#D63384'

      });

      return;

    }


    // ------------------------------------------
    // ACTIVAR MODO EDICIÓN
    // ------------------------------------------

    this.mostrarFormulario = true;

    this.modoEdicion = true;

    this.idProductoEditando =
      Number(producto.id_producto);


    // ------------------------------------------
    // REINICIAR IMAGEN SELECCIONADA
    // ------------------------------------------

    this.imagenSeleccionada = null;


    // Si el producto ya tiene imagen,
    // mostramos que existe una imagen actual.

    this.nombreImagen =
      producto.imagen
        ? 'Imagen actual del producto'
        : '';


    // ------------------------------------------
    // CARGAR DATOS EN EL FORMULARIO
    // ------------------------------------------

    this.productoForm.patchValue({

  nombre:
    producto.nombre ?? '',

  descripcion:
    producto.descripcion ?? '',

  precio:
    Number(producto.precio) || 0,

  stock:
    Number(producto.stock) || 0,

  disponible:
    producto.disponible

});


    // ------------------------------------------
    // DEBUG
    // ------------------------------------------

    console.log(
      'ID producto editando:',
      this.idProductoEditando
    );

    console.log(
      'Formulario cargado:',
      this.productoForm.value
    );

  }


  // ==========================================
  // CANCELAR
  // ==========================================

  cancelar(): void {

    this.mostrarFormulario = false;

    this.modoEdicion = false;

    this.idProductoEditando = null;

    this.imagenSeleccionada = null;

    this.nombreImagen = '';


    this.productoForm.reset({

      nombre: '',

      descripcion: '',

      precio: 0,

      stock: 0,

      disponible: true

    });

  }


  // ==========================================
  // SELECCIONAR IMAGEN
  // ==========================================

  seleccionarImagen(event: Event): void {

    const input =
      event.target as HTMLInputElement;


    if (
      input.files &&
      input.files.length
    ) {

      this.imagenSeleccionada =
        input.files[0];

      this.nombreImagen =
        this.imagenSeleccionada.name;

    }

  }


  // ==========================================
  // CREAR FORMDATA
  // ==========================================

  private crearFormData(): FormData {

    const formData =
      new FormData();


    formData.append(
      'nombre',
      this.productoForm.value.nombre || ''
    );


    formData.append(
      'descripcion',
      this.productoForm.value.descripcion || ''
    );


    formData.append(
      'precio',
      String(
        this.productoForm.value.precio ?? 0
      )
    );


    formData.append(
      'stock',
      String(
        this.productoForm.value.stock ?? 0
      )
    );


    formData.append(
      'disponible',
      String(
        this.productoForm.value.disponible
      )
    );


    // Solo enviamos imagen si el usuario
    // seleccionó una nueva.

    if (this.imagenSeleccionada) {

      formData.append(
        'imagen',
        this.imagenSeleccionada
      );

    }


    return formData;

  }


  // ==========================================
  // GUARDAR / ACTUALIZAR
  // ==========================================

  guardarProducto(): void {

    // ------------------------------------------
    // VALIDAR FORMULARIO
    // ------------------------------------------

    if (this.productoForm.invalid) {

      this.productoForm.markAllAsTouched();

      return;

    }


    // ------------------------------------------
    // CREAR FORMDATA
    // ------------------------------------------

    const formData =
      this.crearFormData();


    // ------------------------------------------
    // MODO EDICIÓN
    // ------------------------------------------

    if (this.modoEdicion) {

      if (!this.idProductoEditando) {

        Swal.fire({

          icon: 'error',

          title: 'Error',

          text:
            'No se encontró el ID del producto que se desea actualizar.'

        });

        return;

      }


      console.log(
        'Actualizando producto:',
        this.idProductoEditando
      );


      this.productoService.actualizar(
        this.idProductoEditando,
        formData
      )
      .subscribe({

        next: (respuesta) => {

          console.log(
            'Producto actualizado:',
            respuesta
          );


          Swal.fire({

            icon: 'success',

            title: 'Producto actualizado',

            text:
              'Cambios guardados correctamente.',

            timer: 1800,

            showConfirmButton: false

          });


          this.cancelar();

          this.listarProductos();

        },


        error: (error) => {

          console.error(
            'Error al actualizar producto:',
            error
          );


          Swal.fire({

            icon: 'error',

            title: 'Error',

            text:
              error?.error?.message ||
              'No se pudo actualizar el producto.'

          });

        }

      });


      return;

    }


    // ------------------------------------------
    // MODO NUEVO PRODUCTO
    // ------------------------------------------

    console.log(
      'Registrando nuevo producto'
    );


    this.productoService.registrar(
      formData
    )
    .subscribe({

      next: (respuesta) => {

        console.log(
          'Producto registrado:',
          respuesta
        );


        Swal.fire({

          icon: 'success',

          title: 'Producto registrado',

          text:
            'Producto agregado correctamente.',

          timer: 1800,

          showConfirmButton: false

        });


        this.cancelar();

        this.listarProductos();

      },


      error: (error) => {

        console.error(
          'Error al registrar producto:',
          error
        );


        Swal.fire({

          icon: 'error',

          title: 'Error',

          text:
            error?.error?.message ||
            'No se pudo registrar el producto.'

        });

      }

    });

  }


  // ==========================================
  // ELIMINAR PRODUCTO
  // ==========================================

  eliminarProducto(
    id: number | undefined
  ): void {

    if (!id) {

      return;

    }


    Swal.fire({

      title: '¿Eliminar producto?',

      text:
        'Esta acción no se puede deshacer.',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#D63384',

      cancelButtonColor: '#6B3E26',

      confirmButtonText: 'Eliminar',

      cancelButtonText: 'Cancelar'

    })
    .then(resultado => {

      if (!resultado.isConfirmed) {

        return;

      }


      this.productoService.eliminar(id)
        .subscribe({

          next: (respuesta) => {

            Swal.fire({

              icon: 'success',

              title: 'Eliminado',

              text:
                respuesta.message,

              timer: 1800,

              showConfirmButton: false

            });


            this.listarProductos();

          },


          error: (error) => {

            console.error(
              'Error al eliminar producto:',
              error
            );


            Swal.fire({

              icon: 'error',

              title: 'Error',

              text:
                error?.error?.message ||
                'No se pudo eliminar el producto.'

            });

          }

        });

    });

  }

}
