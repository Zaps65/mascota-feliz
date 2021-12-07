import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {PedidoPlan} from './pedido-plan.model';
import {Propietario} from './propietario.model';
import {Contrato} from './contrato.model';
import {HistorialVisitaDomiciliaria} from './historial-visita-domiciliaria.model';
import {HistoriaClinica} from './historia-clinica.model';

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

  @hasMany(() => PedidoPlan)
  pedidoPlans: PedidoPlan[];

  @belongsTo(() => Propietario)
  propietarioId: string;

  @hasOne(() => Contrato)
  contrato: Contrato;

  @hasMany(() => HistorialVisitaDomiciliaria)
  historialVisitaDomiciliarias: HistorialVisitaDomiciliaria[];

  @hasMany(() => HistoriaClinica)
  historiaClinicas: HistoriaClinica[];

  @property({
    type: 'string',
  })
  solicitudAfiliacionId?: string;

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
