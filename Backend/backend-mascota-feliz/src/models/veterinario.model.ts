import {Entity, model, property} from '@loopback/repository';

@model()
export class Veterinario extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  clinica: string;


  constructor(data?: Partial<Veterinario>) {
    super(data);
  }
}

export interface VeterinarioRelations {
  // describe navigational properties here
}

export type VeterinarioWithRelations = Veterinario & VeterinarioRelations;
