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
  Contrato,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaContratoController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascota/{id}/contrato', {
    responses: {
      '200': {
        description: 'Contratos que tiene la mascota.',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Contrato),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Contrato>,
  ): Promise<Contrato> {
    return this.mascotaRepository.contrato(id).get(filter);
  }
}
