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
  Mascota,
} from '../models';
import {PedidoPlanRepository} from '../repositories';

export class PedidoPlanMascotaController {
  constructor(
    @repository(PedidoPlanRepository)
    public pedidoPlanRepository: PedidoPlanRepository,
  ) { }

  @get('/pedido-plan/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota que se le activa el plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof PedidoPlan.prototype.id,
  ): Promise<Mascota> {
    return this.pedidoPlanRepository.mascota(id);
  }
}
