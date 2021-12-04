import {Entity, model, property} from '@loopback/repository';

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
    required: true,
  })
  fecha_respuesta: string;

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
    type: 'string',
    required: true,
  })
  HistorialVisitaDomiciliaria: string;


  constructor(data?: Partial<SolicitudAfiliacion>) {
    super(data);
  }
}

export interface SolicitudAfiliacionRelations {
  // describe navigational properties here
}

export type SolicitudAfiliacionWithRelations = SolicitudAfiliacion & SolicitudAfiliacionRelations;
