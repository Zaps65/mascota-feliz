import {Entity, model, property} from '@loopback/repository';

@model()
export class PlanMascota extends Entity {
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

  constructor(data?: Partial<PlanMascota>) {
    super(data);
  }
}

export interface PlanMascotaRelations {
  // describe navigational properties here
}

export type PlanMascotaWithRelations = PlanMascota & PlanMascotaRelations;
