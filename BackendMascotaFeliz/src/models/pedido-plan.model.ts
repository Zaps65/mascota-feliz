import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Propietario} from './propietario.model';

@model()
export class PedidoPlan extends Entity {
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

  constructor(data?: Partial<PedidoPlan>) {
    super(data);
  }
}

export interface PedidoPlanRelations {
  // describe navigational properties here
}

export type PedidoPlanWithRelations = PedidoPlan & PedidoPlanRelations;
