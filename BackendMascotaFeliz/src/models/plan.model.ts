import {Entity, model, property, hasMany} from '@loopback/repository';
import {PedidoPlan} from './pedido-plan.model';
import {LineaPlanes} from './linea-planes.model';
import {Mascota} from './mascota.model';
import {PlanMascota} from './plan-mascota.model';

@model()
export class Plan extends Entity {
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
    type: 'string',
    required: true,
  })
  foto: string;

  @hasMany(() => PedidoPlan, {through: {model: () => LineaPlanes}})
  pedidoPlans: PedidoPlan[];

  @hasMany(() => Mascota, {through: {model: () => PlanMascota}})
  mascotas: Mascota[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
