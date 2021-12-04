import {Entity, model, property} from '@loopback/repository';

@model()
export class LineaPlanes extends Entity {
  @property({
    type: 'number',
    default: 1,
  })
  cantidad?: number;

  @property({
    type: 'string',
  })
  planId?: string;

  @property({
    type: 'string',
  })
  pedidoPlanId?: string;

  constructor(data?: Partial<LineaPlanes>) {
    super(data);
  }
}

export interface LineaPlanesRelations {
  // describe navigational properties here
}

export type LineaPlanesWithRelations = LineaPlanes & LineaPlanesRelations;
