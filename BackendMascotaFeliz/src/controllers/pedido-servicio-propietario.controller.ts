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
  Propietario,
} from '../models';
import {PedidoServicioRepository} from '../repositories';

export class PedidoServicioPropietarioController {
  constructor(
    @repository(PedidoServicioRepository)
    public pedidoServicioRepository: PedidoServicioRepository,
  ) { }

  @get('/pedido-servicios/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to PedidoServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof PedidoServicio.prototype.id,
  ): Promise<Propietario> {
    return this.pedidoServicioRepository.propietario(id);
  }
}
