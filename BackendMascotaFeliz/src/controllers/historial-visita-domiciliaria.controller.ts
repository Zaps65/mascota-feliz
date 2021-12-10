import {
  Filter,
  FilterExcludingWhere,
  repository
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
    description: 'Se ha creado el historial de visita domiciliaria',
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

  @get('/historial-visita-domiciliaria')
  @response(200, {
    description: 'Lista de los historiales de visita domiciliaria',
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

  @get('/historial-visita-domiciliaria/{id}')
  @response(200, {
    description: 'Información del historial de visita domiciliaria',
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
    description: 'Historial de visita domiciliaria actualizado',
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
    description: 'Historial de visita domiciliaria actualizado',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() historialVisitaDomiciliaria: HistorialVisitaDomiciliaria,
  ): Promise<void> {
    await this.historialVisitaDomiciliariaRepository.replaceById(id, historialVisitaDomiciliaria);
  }

  @del('/historial-visita-domiciliaria/{id}')
  @response(204, {
    description: 'Historial de visita domiciliaria eliminado',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.historialVisitaDomiciliariaRepository.deleteById(id);
  }
}
