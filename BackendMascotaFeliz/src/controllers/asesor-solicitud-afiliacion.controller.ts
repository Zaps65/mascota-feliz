import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param
} from '@loopback/rest';
import {
  SolicitudAfiliacion
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorSolicitudAfiliacionController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesores/{id}/solicitud-afiliaciones', {
    responses: {
      '200': {
        description: 'Lista de las solicitudes de afiliaciones gestionadas por un asesor.',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudAfiliacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudAfiliacion>,
  ): Promise<SolicitudAfiliacion[]> {
    return this.asesorRepository.solicitudAfiliacions(id).find(filter);
  }
}
