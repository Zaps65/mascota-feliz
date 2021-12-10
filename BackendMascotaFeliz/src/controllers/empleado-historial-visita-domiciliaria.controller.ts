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
  param
} from '@loopback/rest';
import {
  HistorialVisitaDomiciliaria,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoHistorialVisitaDomiciliariaController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleado/{id}/historial-visita-domiciliaria', {
    responses: {
      '200': {
        description: 'Lista de todos los historiales de visita hechas por un empleado.',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HistorialVisitaDomiciliaria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HistorialVisitaDomiciliaria>,
  ): Promise<HistorialVisitaDomiciliaria[]> {
    return this.empleadoRepository.historialVisitaDomiciliarias(id).find(filter);
  }

  @del('/empleado/{id}/historial-visita-domiciliaria', {
    responses: {
      '200': {
        description: 'Se ha eliminado el historial de visita domiciliaria realizado por un empleado.',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HistorialVisitaDomiciliaria)) where?: Where<HistorialVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.empleadoRepository.historialVisitaDomiciliarias(id).delete(where);
  }
}
