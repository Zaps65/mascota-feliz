import {Entity, model, property, hasMany} from '@loopback/repository';
import {PedidoPlan} from './pedido-plan.model';
import {PedidoProducto} from './pedido-producto.model';
import {PedidoServicio} from './pedido-servicio.model';

@model()
export class Propietario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @hasMany(() => PedidoPlan)
  pedidoPlans: PedidoPlan[];

  @hasMany(() => PedidoProducto)
  pedidoProductos: PedidoProducto[];

  @hasMany(() => PedidoServicio)
  pedidoServicios: PedidoServicio[];

  constructor(data?: Partial<Propietario>) {
    super(data);
  }
}

export interface PropietarioRelations {
  // describe navigational properties here
}

export type PropietarioWithRelations = Propietario & PropietarioRelations;
