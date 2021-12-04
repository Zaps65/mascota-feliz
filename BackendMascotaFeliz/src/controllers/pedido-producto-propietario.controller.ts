import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PedidoProducto,
  Propietario,
} from '../models';
import {PedidoProductoRepository} from '../repositories';

export class PedidoProductoPropietarioController {
  constructor(
    @repository(PedidoProductoRepository)
    public pedidoProductoRepository: PedidoProductoRepository,
  ) { }

  @get('/pedido-productos/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to PedidoProducto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof PedidoProducto.prototype.id,
  ): Promise<Propietario> {
    return this.pedidoProductoRepository.propietario(id);
  }
}
