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
  Proveedor,
  Productos,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorProductosController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedores/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many Productos',
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
    return this.proveedorRepository.productos(id).find(filter);
  }

  @post('/proveedores/{id}/productos', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInProveedor',
            exclude: ['id'],
            optional: ['proveedorId']
          }),
        },
      },
    }) productos: Omit<Productos, 'id'>,
  ): Promise<Productos> {
    return this.proveedorRepository.productos(id).create(productos);
  }

  @patch('/proveedores/{id}/productos', {
    responses: {
      '200': {
        description: 'Proveedor.Productos PATCH success count',
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
    return this.proveedorRepository.productos(id).patch(productos, where);
  }

  @del('/proveedores/{id}/productos', {
    responses: {
      '200': {
        description: 'Proveedor.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.proveedorRepository.productos(id).delete(where);
  }
}
