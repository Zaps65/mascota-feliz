import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {Productos} from './productos.model';
import {LineaProductos} from './linea-productos.model';
import {Empleado} from './empleado.model';

@model()
export class PedidoProductos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

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

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<PedidoProductos>) {
    super(data);
  }
}

export interface PedidoProductosRelations {
  // describe navigational properties here
}

export type PedidoProductosWithRelations = PedidoProductos & PedidoProductosRelations;
