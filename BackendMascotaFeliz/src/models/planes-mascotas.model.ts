import {Entity, model, property} from '@loopback/repository';

@model()
export class PlanesMascotas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_inicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_final: string;

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
  mascotaId?: string;

  constructor(data?: Partial<PlanesMascotas>) {
    super(data);
  }
}

export interface PlanesMascotasRelations {
  // describe navigational properties here
}

export type PlanesMascotasWithRelations = PlanesMascotas & PlanesMascotasRelations;
