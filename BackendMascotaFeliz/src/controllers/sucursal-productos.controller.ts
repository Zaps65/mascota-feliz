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
  Sucursal,
  Productos,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalProductosController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursales/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos[]> {
    return this.sucursalRepository.productos(id).find(filter);
  }

  @post('/sucursales/{id}/productos', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInSucursal',
            exclude: ['id'],
            optional: ['sucursalId']
          }),
        },
      },
    }) productos: Omit<Productos, 'id'>,
  ): Promise<Productos> {
    return this.sucursalRepository.productos(id).create(productos);
  }

  @patch('/sucursales/{id}/productos', {
    responses: {
      '200': {
        description: 'Sucursal.Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.sucursalRepository.productos(id).patch(productos, where);
  }

  @del('/sucursales/{id}/productos', {
    responses: {
      '200': {
        description: 'Sucursal.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.sucursalRepository.productos(id).delete(where);
  }
}
