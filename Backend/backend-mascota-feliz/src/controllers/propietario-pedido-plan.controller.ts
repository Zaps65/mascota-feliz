import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Propietario,
  PedidoPlan,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioPedidoPlanController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/pedido-plans', {
    responses: {
      '200': {
        description: 'Array of Propietario has many PedidoPlan',
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
    return this.propietarioRepository.pedidoPlans(id).find(filter);
  }

  @post('/propietarios/{id}/pedido-plans', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoPlan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoPlan, {
            title: 'NewPedidoPlanInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) pedidoPlan: Omit<PedidoPlan, 'id'>,
  ): Promise<PedidoPlan> {
    return this.propietarioRepository.pedidoPlans(id).create(pedidoPlan);
  }

  @patch('/propietarios/{id}/pedido-plans', {
    responses: {
      '200': {
        description: 'Propietario.PedidoPlan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoPlan, {partial: true}),
        },
      },
    })
    pedidoPlan: Partial<PedidoPlan>,
    @param.query.object('where', getWhereSchemaFor(PedidoPlan)) where?: Where<PedidoPlan>,
  ): Promise<Count> {
    return this.propietarioRepository.pedidoPlans(id).patch(pedidoPlan, where);
  }

  @del('/propietarios/{id}/pedido-plans', {
    responses: {
      '200': {
        description: 'Propietario.PedidoPlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoPlan)) where?: Where<PedidoPlan>,
  ): Promise<Count> {
    return this.propietarioRepository.pedidoPlans(id).delete(where);
  }
}
