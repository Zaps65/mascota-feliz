import {Entity, model, property} from '@loopback/repository';

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
    required: true,
  })
  comentario: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_confirmacion: string;


  constructor(data?: Partial<Contrato>) {
    super(data);
  }
}

export interface ContratoRelations {
  // describe navigational properties here
}

export type ContratoWithRelations = Contrato & ContratoRelations;
