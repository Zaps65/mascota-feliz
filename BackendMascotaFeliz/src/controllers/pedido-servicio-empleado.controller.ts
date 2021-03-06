import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PedidoServicio,
  Empleado,
} from '../models';
import {PedidoServicioRepository} from '../repositories';

export class PedidoServicioEmpleadoController {
  constructor(
    @repository(PedidoServicioRepository)
    public pedidoServicioRepository: PedidoServicioRepository,
  ) { }

  @get('/pedido-servicio/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado encargado de un pedido de servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof PedidoServicio.prototype.id,
  ): Promise<Empleado> {
    return this.pedidoServicioRepository.empleado(id);
  }
}
