import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PedidoPlan,
  Propietario,
} from '../models';
import {PedidoPlanRepository} from '../repositories';

export class PedidoPlanPropietarioController {
  constructor(
    @repository(PedidoPlanRepository)
    public pedidoPlanRepository: PedidoPlanRepository,
  ) { }

  @get('/pedido-planes/{id}/propietario', {
    responses: {
      '200': {
        description: 'La persona responsable del pedido del plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof PedidoPlan.prototype.id,
  ): Promise<Propietario> {
    return this.pedidoPlanRepository.propietario(id);
  }
}
