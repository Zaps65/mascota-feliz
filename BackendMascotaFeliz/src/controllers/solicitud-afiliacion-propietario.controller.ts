import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudAfiliacion,
  Propietario,
} from '../models';
import {SolicitudAfiliacionRepository} from '../repositories';

export class SolicitudAfiliacionPropietarioController {
  constructor(
    @repository(SolicitudAfiliacionRepository)
    public solicitudAfiliacionRepository: SolicitudAfiliacionRepository,
  ) { }

  @get('/solicitud-afiliaciones/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to SolicitudAfiliacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof SolicitudAfiliacion.prototype.id,
  ): Promise<Propietario> {
    return this.solicitudAfiliacionRepository.propietario(id);
  }
}
