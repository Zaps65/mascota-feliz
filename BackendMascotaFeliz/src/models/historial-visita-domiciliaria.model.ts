import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Empleado} from './empleado.model';

@model()
export class HistorialVisitaDomiciliaria extends Entity {
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
    type: 'date',
    required: true,
  })
  hora_inicio: string;

  @property({
    type: 'date',
    required: true,
  })
  hora_fin: string;

  @property({
    type: 'string',
    required: true,
  })
  alimento: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<HistorialVisitaDomiciliaria>) {
    super(data);
  }
}

export interface HistorialVisitaDomiciliariaRelations {
  // describe navigational properties here
}

export type HistorialVisitaDomiciliariaWithRelations = HistorialVisitaDomiciliaria & HistorialVisitaDomiciliariaRelations;
