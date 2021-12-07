import {Entity, model, property, hasMany} from '@loopback/repository';
import {Productos} from './productos.model';

@model()
export class Sucursal extends Entity {
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
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @hasMany(() => Productos)
  productos: Productos[];

  constructor(data?: Partial<Sucursal>) {
    super(data);
  }
}

export interface SucursalRelations {
  // describe navigational properties here
}

export type SucursalWithRelations = Sucursal & SucursalRelations;
