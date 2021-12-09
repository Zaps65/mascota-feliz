import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PedidoProductos,
  Empleado,
} from '../models';
import {PedidoProductosRepository} from '../repositories';

export class PedidoProductosEmpleadoController {
  constructor(
    @repository(PedidoProductosRepository)
    public pedidoProductosRepository: PedidoProductosRepository,
  ) { }

  @get('/pedido-productos/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to PedidoProductos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof PedidoProductos.prototype.id,
  ): Promise<Empleado> {
    return this.pedidoProductosRepository.empleado(id);
  }
}
