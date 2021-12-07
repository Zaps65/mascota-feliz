import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {LineaProductos} from '../models';
import {LineaProductosRepository} from '../repositories';

export class LineaProductosController {
  constructor(
    @repository(LineaProductosRepository)
    public lineaProductosRepository : LineaProductosRepository,
  ) {}

  @post('/linea-productos')
  @response(200, {
    description: 'LineaProductos model instance',
    content: {'application/json': {schema: getModelSchemaRef(LineaProductos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaProductos, {
            title: 'NewLineaProductos',
            exclude: ['id'],
          }),
        },
      },
    })
    lineaProductos: Omit<LineaProductos, 'id'>,
  ): Promise<LineaProductos> {
    return this.lineaProductosRepository.create(lineaProductos);
  }

  @get('/linea-productos/count')
  @response(200, {
    description: 'LineaProductos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LineaProductos) where?: Where<LineaProductos>,
  ): Promise<Count> {
    return this.lineaProductosRepository.count(where);
  }

  @get('/linea-productos')
  @response(200, {
    description: 'Array of LineaProductos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LineaProductos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LineaProductos) filter?: Filter<LineaProductos>,
  ): Promise<LineaProductos[]> {
    return this.lineaProductosRepository.find(filter);
  }

  @patch('/linea-productos')
  @response(200, {
    description: 'LineaProductos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaProductos, {partial: true}),
        },
      },
    })
    lineaProductos: LineaProductos,
    @param.where(LineaProductos) where?: Where<LineaProductos>,
  ): Promise<Count> {
    return this.lineaProductosRepository.updateAll(lineaProductos, where);
  }

  @get('/linea-productos/{id}')
  @response(200, {
    description: 'LineaProductos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LineaProductos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LineaProductos, {exclude: 'where'}) filter?: FilterExcludingWhere<LineaProductos>
  ): Promise<LineaProductos> {
    return this.lineaProductosRepository.findById(id, filter);
  }

  @patch('/linea-productos/{id}')
  @response(204, {
    description: 'LineaProductos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaProductos, {partial: true}),
        },
      },
    })
    lineaProductos: LineaProductos,
  ): Promise<void> {
    await this.lineaProductosRepository.updateById(id, lineaProductos);
  }

  @put('/linea-productos/{id}')
  @response(204, {
    description: 'LineaProductos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lineaProductos: LineaProductos,
  ): Promise<void> {
    await this.lineaProductosRepository.replaceById(id, lineaProductos);
  }

  @del('/linea-productos/{id}')
  @response(204, {
    description: 'LineaProductos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lineaProductosRepository.deleteById(id);
  }
}
