import {Entity, model, property, hasMany} from '@loopback/repository';
import {PedidoServicio} from './pedido-servicio.model';
import {LineaServicios} from './linea-servicios.model';

@model()
export class Servicios extends Entity {
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
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @hasMany(() => PedidoServicio, {through: {model: () => LineaServicios}})
  pedidoServicios: PedidoServicio[];

  constructor(data?: Partial<Servicios>) {
    super(data);
  }
}

export interface ServiciosRelations {
  // describe navigational properties here
}

export type ServiciosWithRelations = Servicios & ServiciosRelations;
