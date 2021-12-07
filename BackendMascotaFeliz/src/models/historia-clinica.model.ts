import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Veterinario} from './veterinario.model';

@model()
export class HistoriaClinica extends Entity {
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
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  diagnostico: string;

  @property({
    type: 'string',
    required: true,
  })
  tratamiento: string;

  @property({
    type: 'string',
    required: true,
  })
  motivo_consulta: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Veterinario)
  veterinarioId: string;

  constructor(data?: Partial<HistoriaClinica>) {
    super(data);
  }
}

export interface HistoriaClinicaRelations {
  // describe navigational properties here
}

export type HistoriaClinicaWithRelations = HistoriaClinica & HistoriaClinicaRelations;
