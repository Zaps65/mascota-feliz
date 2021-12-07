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
import {HistorialVisitaDomiciliaria} from '../models';
import {HistorialVisitaDomiciliariaRepository} from '../repositories';

export class HistorialVisitaDomiciliariaController {
  constructor(
    @repository(HistorialVisitaDomiciliariaRepository)
    public historialVisitaDomiciliariaRepository : HistorialVisitaDomiciliariaRepository,
  ) {}

  @post('/historial-visita-domiciliaria')
  @response(200, {
    description: 'HistorialVisitaDomiciliaria model instance',
    content: {'application/json': {schema: getModelSchemaRef(HistorialVisitaDomiciliaria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistorialVisitaDomiciliaria, {
            title: 'NewHistorialVisitaDomiciliaria',
            exclude: ['id'],
          }),
        },
      },
    })
    historialVisitaDomiciliaria: Omit<HistorialVisitaDomiciliaria, 'id'>,
  ): Promise<HistorialVisitaDomiciliaria> {
    return this.historialVisitaDomiciliariaRepository.create(historialVisitaDomiciliaria);
  }

  @get('/historial-visita-domiciliaria/count')
  @response(200, {
    description: 'HistorialVisitaDomiciliaria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HistorialVisitaDomiciliaria) where?: Where<HistorialVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.historialVisitaDomiciliariaRepository.count(where);
  }

  @get('/historial-visita-domiciliaria')
  @response(200, {
    description: 'Array of HistorialVisitaDomiciliaria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HistorialVisitaDomiciliaria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HistorialVisitaDomiciliaria) filter?: Filter<HistorialVisitaDomiciliaria>,
  ): Promise<HistorialVisitaDomiciliaria[]> {
    return this.historialVisitaDomiciliariaRepository.find(filter);
  }

  @patch('/historial-visita-domiciliaria')
  @response(200, {
    description: 'HistorialVisitaDomiciliaria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistorialVisitaDomiciliaria, {partial: true}),
        },
      },
    })
    historialVisitaDomiciliaria: HistorialVisitaDomiciliaria,
    @param.where(HistorialVisitaDomiciliaria) where?: Where<HistorialVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.historialVisitaDomiciliariaRepository.updateAll(historialVisitaDomiciliaria, where);
  }

  @get('/historial-visita-domiciliaria/{id}')
  @response(200, {
    description: 'HistorialVisitaDomiciliaria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HistorialVisitaDomiciliaria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(HistorialVisitaDomiciliaria, {exclude: 'where'}) filter?: FilterExcludingWhere<HistorialVisitaDomiciliaria>
  ): Promise<HistorialVisitaDomiciliaria> {
    return this.historialVisitaDomiciliariaRepository.findById(id, filter);
  }

  @patch('/historial-visita-domiciliaria/{id}')
  @response(204, {
    description: 'HistorialVisitaDomiciliaria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistorialVisitaDomiciliaria, {partial: true}),
        },
      },
    })
    historialVisitaDomiciliaria: HistorialVisitaDomiciliaria,
  ): Promise<void> {
    await this.historialVisitaDomiciliariaRepository.updateById(id, historialVisitaDomiciliaria);
  }

  @put('/historial-visita-domiciliaria/{id}')
  @response(204, {
    description: 'HistorialVisitaDomiciliaria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() historialVisitaDomiciliaria: HistorialVisitaDomiciliaria,
  ): Promise<void> {
    await this.historialVisitaDomiciliariaRepository.replaceById(id, historialVisitaDomiciliaria);
  }

  @del('/historial-visita-domiciliaria/{id}')
  @response(204, {
    description: 'HistorialVisitaDomiciliaria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.historialVisitaDomiciliariaRepository.deleteById(id);
  }
}
