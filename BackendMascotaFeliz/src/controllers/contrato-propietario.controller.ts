import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Contrato,
  Propietario,
} from '../models';
import {ContratoRepository} from '../repositories';

export class ContratoPropietarioController {
  constructor(
    @repository(ContratoRepository)
    public contratoRepository: ContratoRepository,
  ) { }

  @get('/contrato/{id}/propietario', {
    responses: {
      '200': {
        description: 'El propietario relacionado con el contrato',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof Contrato.prototype.id,
  ): Promise<Propietario> {
    return this.contratoRepository.propietario(id);
  }
}
