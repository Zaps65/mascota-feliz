import {Entity, model, property} from '@loopback/repository';

@model()
export class LineaProductos extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
  })
  productosId?: string;

  @property({
    type: 'string',
  })
  pedidoProductoId?: string;

  constructor(data?: Partial<LineaProductos>) {
    super(data);
  }
}

export interface LineaProductosRelations {
  // describe navigational properties here
}

export type LineaProductosWithRelations = LineaProductos & LineaProductosRelations;
