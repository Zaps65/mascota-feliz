import {Entity, model, property} from '@loopback/repository';

@model()
export class LineaProductos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    default: 1,
  })
  cantidad?: number;


  constructor(data?: Partial<LineaProductos>) {
    super(data);
  }
}

export interface LineaProductosRelations {
  // describe navigational properties here
}

export type LineaProductosWithRelations = LineaProductos & LineaProductosRelations;
