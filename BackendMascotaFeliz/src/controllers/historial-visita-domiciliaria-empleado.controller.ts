import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HistorialVisitaDomiciliaria,
  Empleado,
} from '../models';
import {HistorialVisitaDomiciliariaRepository} from '../repositories';

export class HistorialVisitaDomiciliariaEmpleadoController {
  constructor(
    @repository(HistorialVisitaDomiciliariaRepository)
    public historialVisitaDomiciliariaRepository: HistorialVisitaDomiciliariaRepository,
  ) { }

  @get('/historial-visita-domiciliaria/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado que realizo la visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof HistorialVisitaDomiciliaria.prototype.id,
  ): Promise<Empleado> {
    return this.historialVisitaDomiciliariaRepository.empleado(id);
  }
}
