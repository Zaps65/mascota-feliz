import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param
} from '@loopback/rest';
import {
  PedidoPlan,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPedidoPlanController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascota/{id}/pedido-plan', {
    responses: {
      '200': {
        description: 'Lista de los planes de una mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PedidoPlan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PedidoPlan>,
  ): Promise<PedidoPlan[]> {
    return this.mascotaRepository.pedidoPlans(id).find(filter);
  }
}
