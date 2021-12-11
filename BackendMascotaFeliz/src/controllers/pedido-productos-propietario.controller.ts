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
  Propietario,
} from '../models';
import {PedidoProductosRepository} from '../repositories';

export class PedidoProductosPropietarioController {
  constructor(
    @repository(PedidoProductosRepository)
    public pedidoProductosRepository: PedidoProductosRepository,
  ) { }

  @get('/pedido-producto/{id}/propietario', {
    responses: {
      '200': {
        description: 'Persona que encargo el pedido de productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof PedidoProductos.prototype.id,
  ): Promise<Propietario> {
    return this.pedidoProductosRepository.propietario(id);
  }
}
