import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Sucursal} from './sucursal.model';
import {Proveedor} from './proveedor.model';

@model()
export class Productos extends Entity {
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
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  stock: number;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @belongsTo(() => Sucursal)
  sucursalId: string;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
