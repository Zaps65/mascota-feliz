import {Entity, model, property} from '@loopback/repository';

@model()
export class Mascota extends Entity {
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
  foto: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'string',
  })
  raza?: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'number',
    required: true,
  })
  peso: number;

  @property({
    type: 'boolean',
    required: true,
  })
  afiliado: boolean;


  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
