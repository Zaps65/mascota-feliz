import {Entity, model, property} from '@loopback/repository';

@model()
export class PedidoProductos extends Entity {
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
  fecha_entrega: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_pago: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  forma_pago: string;

  @property({
    type: 'string',
  })
  observaciones?: string;


  constructor(data?: Partial<PedidoProductos>) {
    super(data);
  }
}

export interface PedidoProductosRelations {
  // describe navigational properties here
}

export type PedidoProductosWithRelations = PedidoProductos & PedidoProductosRelations;
