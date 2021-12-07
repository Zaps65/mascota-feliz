import {Entity, model, property} from '@loopback/repository';

@model()
export class LineaPlanes extends Entity {
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

  @property({
    type: 'string',
  })
  pedidoPlanId?: string;

  @property({
    type: 'string',
  })
  planId?: string;

  constructor(data?: Partial<LineaPlanes>) {
    super(data);
  }
}

export interface LineaPlanesRelations {
  // describe navigational properties here
}

export type LineaPlanesWithRelations = LineaPlanes & LineaPlanesRelations;
