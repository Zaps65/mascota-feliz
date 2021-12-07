import {Entity, model, property} from '@loopback/repository';

@model()
export class LineaServicios extends Entity {
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
  pedidoServicioId?: string;

  @property({
    type: 'string',
  })
  serviciosId?: string;

  constructor(data?: Partial<LineaServicios>) {
    super(data);
  }
}

export interface LineaServiciosRelations {
  // describe navigational properties here
}

export type LineaServiciosWithRelations = LineaServicios & LineaServiciosRelations;
