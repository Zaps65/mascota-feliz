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
    type: 'date',
    required: true,
  })
  fecha_inicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_fin: string;


  constructor(data?: Partial<LineaPlanes>) {
    super(data);
  }
}

export interface LineaPlanesRelations {
  // describe navigational properties here
}

export type LineaPlanesWithRelations = LineaPlanes & LineaPlanesRelations;
