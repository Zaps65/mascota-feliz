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
  Empleado,
  HistorialVisitaDomiciliaria,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoHistorialVisitaDomiciliariaController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/historial-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Array of Empleado has many HistorialVisitaDomiciliaria',
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

  @post('/empleados/{id}/historial-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(HistorialVisitaDomiciliaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistorialVisitaDomiciliaria, {
            title: 'NewHistorialVisitaDomiciliariaInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) historialVisitaDomiciliaria: Omit<HistorialVisitaDomiciliaria, 'id'>,
  ): Promise<HistorialVisitaDomiciliaria> {
    return this.empleadoRepository.historialVisitaDomiciliarias(id).create(historialVisitaDomiciliaria);
  }

  @patch('/empleados/{id}/historial-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Empleado.HistorialVisitaDomiciliaria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistorialVisitaDomiciliaria, {partial: true}),
        },
      },
    })
    historialVisitaDomiciliaria: Partial<HistorialVisitaDomiciliaria>,
    @param.query.object('where', getWhereSchemaFor(HistorialVisitaDomiciliaria)) where?: Where<HistorialVisitaDomiciliaria>,
  ): Promise<Count> {
    return this.empleadoRepository.historialVisitaDomiciliarias(id).patch(historialVisitaDomiciliaria, where);
  }

  @del('/empleados/{id}/historial-visita-domiciliarias', {
    responses: {
      '200': {
        description: 'Empleado.HistorialVisitaDomiciliaria DELETE success count',
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
