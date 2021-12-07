import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Contrato} from './contrato.model';
import {Asesor} from './asesor.model';
import {Propietario} from './propietario.model';
import {Mascota} from './mascota.model';

@model()
export class SolicitudAfiliacion extends Entity {
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
  fecha_solicitud: string;

  @property({
    type: 'date',
  })
  fecha_respuesta?: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
  })
  comentario?: string;

  @hasOne(() => Contrato)
  contrato: Contrato;

  @belongsTo(() => Asesor)
  asesorId: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @hasOne(() => Mascota)
  mascota: Mascota;

  constructor(data?: Partial<SolicitudAfiliacion>) {
    super(data);
  }
}

export interface SolicitudAfiliacionRelations {
  // describe navigational properties here
}

export type SolicitudAfiliacionWithRelations = SolicitudAfiliacion & SolicitudAfiliacionRelations;
