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
  Empleado,
} from '../models';
import {PedidoPlanRepository} from '../repositories';

export class PedidoPlanEmpleadoController {
  constructor(
    @repository(PedidoPlanRepository)
    public pedidoPlanRepository: PedidoPlanRepository,
  ) { }

  @get('/pedido-plan/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado responsable del pedido del plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof PedidoPlan.prototype.id,
  ): Promise<Empleado> {
    return this.pedidoPlanRepository.empleado(id);
  }
}
