import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<HistoriaClinica>) {
    super(data);
  }
}

export interface HistoriaClinicaRelations {
  // describe navigational properties here
}

export type HistoriaClinicaWithRelations = HistoriaClinica & HistoriaClinicaRelations;
