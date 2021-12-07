import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {Productos} from './productos.model';
import {LineaProductos} from './linea-productos.model';

@model()
export class PedidoProducto extends Entity {
  @property({
    type: 'number',
  })
  total?: number;

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
  fecha_entrega: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_pago: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  forma_pago: string;

  @property({
    type: 'string',
  })
  observaciones?: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @hasMany(() => Productos, {through: {model: () => LineaProductos}})
  productos: Productos[];

  constructor(data?: Partial<PedidoProducto>) {
    super(data);
  }
}

export interface PedidoProductoRelations {
  // describe navigational properties here
}

export type PedidoProductoWithRelations = PedidoProducto & PedidoProductoRelations;
