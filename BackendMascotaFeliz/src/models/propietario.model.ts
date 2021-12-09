import {Entity, model, property, hasMany} from '@loopback/repository';
import {PedidoPlan} from './pedido-plan.model';
import {PedidoProductos} from './pedido-productos.model';
import {PedidoServicio} from './pedido-servicio.model';
import {Mascota} from './mascota.model';
import {Contrato} from './contrato.model';
import {SolicitudAfiliacion} from './solicitud-afiliacion.model';

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
  })
  clave?: string;

  @property({
    type: 'string',
    default: 'user',
  })
  rol?: string;

  @hasMany(() => PedidoPlan)
  pedidoPlans: PedidoPlan[];

  @hasMany(() => PedidoProductos)
  pedidoProductos: PedidoProductos[];

  @hasMany(() => PedidoServicio)
  pedidoServicios: PedidoServicio[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @hasMany(() => Contrato)
  contratoes: Contrato[];

  @hasMany(() => SolicitudAfiliacion)
  solicitudAfiliacions: SolicitudAfiliacion[];

  constructor(data?: Partial<Propietario>) {
    super(data);
  }
}

export interface PropietarioRelations {
  // describe navigational properties here
}

export type PropietarioWithRelations = Propietario & PropietarioRelations;
