import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {Servicios} from './servicios.model';
import {LineaServicios} from './linea-servicios.model';
import {Empleado} from './empleado.model';

@model()
export class PedidoServicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_pago: string;

  @property({
    type: 'string',
    required: true,
  })
  forma_pago: string;

  @property({
    type: 'string',
  })
  observaciones?: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @hasMany(() => Servicios, {through: {model: () => LineaServicios}})
  servicios: Servicios[];

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<PedidoServicio>) {
    super(data);
  }
}

export interface PedidoServicioRelations {
  // describe navigational properties here
}

export type PedidoServicioWithRelations = PedidoServicio & PedidoServicioRelations;
