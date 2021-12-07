import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<PedidoServicio>) {
    super(data);
  }
}

export interface PedidoServicioRelations {
  // describe navigational properties here
}

export type PedidoServicioWithRelations = PedidoServicio & PedidoServicioRelations;
