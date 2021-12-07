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
import {LineaServicios} from '../models';
import {LineaServiciosRepository} from '../repositories';

export class LineaServiciosController {
  constructor(
    @repository(LineaServiciosRepository)
    public lineaServiciosRepository : LineaServiciosRepository,
  ) {}

  @post('/linea-servicios')
  @response(200, {
    description: 'LineaServicios model instance',
    content: {'application/json': {schema: getModelSchemaRef(LineaServicios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaServicios, {
            title: 'NewLineaServicios',
            exclude: ['id'],
          }),
        },
      },
    })
    lineaServicios: Omit<LineaServicios, 'id'>,
  ): Promise<LineaServicios> {
    return this.lineaServiciosRepository.create(lineaServicios);
  }

  @get('/linea-servicios/count')
  @response(200, {
    description: 'LineaServicios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LineaServicios) where?: Where<LineaServicios>,
  ): Promise<Count> {
    return this.lineaServiciosRepository.count(where);
  }

  @get('/linea-servicios')
  @response(200, {
    description: 'Array of LineaServicios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LineaServicios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LineaServicios) filter?: Filter<LineaServicios>,
  ): Promise<LineaServicios[]> {
    return this.lineaServiciosRepository.find(filter);
  }

  @patch('/linea-servicios')
  @response(200, {
    description: 'LineaServicios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaServicios, {partial: true}),
        },
      },
    })
    lineaServicios: LineaServicios,
    @param.where(LineaServicios) where?: Where<LineaServicios>,
  ): Promise<Count> {
    return this.lineaServiciosRepository.updateAll(lineaServicios, where);
  }

  @get('/linea-servicios/{id}')
  @response(200, {
    description: 'LineaServicios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LineaServicios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LineaServicios, {exclude: 'where'}) filter?: FilterExcludingWhere<LineaServicios>
  ): Promise<LineaServicios> {
    return this.lineaServiciosRepository.findById(id, filter);
  }

  @patch('/linea-servicios/{id}')
  @response(204, {
    description: 'LineaServicios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaServicios, {partial: true}),
        },
      },
    })
    lineaServicios: LineaServicios,
  ): Promise<void> {
    await this.lineaServiciosRepository.updateById(id, lineaServicios);
  }

  @put('/linea-servicios/{id}')
  @response(204, {
    description: 'LineaServicios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lineaServicios: LineaServicios,
  ): Promise<void> {
    await this.lineaServiciosRepository.replaceById(id, lineaServicios);
  }

  @del('/linea-servicios/{id}')
  @response(204, {
    description: 'LineaServicios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lineaServiciosRepository.deleteById(id);
  }
}
