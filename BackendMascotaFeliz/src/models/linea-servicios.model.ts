import {Entity, model, property} from '@loopback/repository';

@model()
export class LineaServicios extends Entity {
  @property({
    type: 'number',
    default: 1,
  })
  cantidad?: number;

  @property({
    type: 'string',
  })
  serviciosId?: string;

  @property({
    type: 'string',
  })
  pedidoServicioId?: string;

  constructor(data?: Partial<LineaServicios>) {
    super(data);
  }
}

export interface LineaServiciosRelations {
  // describe navigational properties here
}

export type LineaServiciosWithRelations = LineaServicios & LineaServiciosRelations;
