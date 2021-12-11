import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {Mascota} from './mascota.model';
import {SolicitudAfiliacion} from './solicitud-afiliacion.model';

@model()
export class Contrato extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  file_contrato: string;

  @property({
    type: 'string',
    required: true,
  })
  comprobante_pago: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
  })
  comentario?: string;

  @property({
    type: 'date',
  })
  fecha_confirmacion?: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => SolicitudAfiliacion)
  solicitudAfiliacionId: string;

  constructor(data?: Partial<Contrato>) {
    super(data);
  }
}

export interface ContratoRelations {
  // describe navigational properties here
}

export type ContratoWithRelations = Contrato & ContratoRelations;
