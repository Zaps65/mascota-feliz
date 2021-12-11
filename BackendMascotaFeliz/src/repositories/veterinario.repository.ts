import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Veterinario, VeterinarioRelations, HistoriaClinica} from '../models';
import {HistoriaClinicaRepository} from './historia-clinica.repository';

export class VeterinarioRepository extends DefaultCrudRepository<
  Veterinario,
  typeof Veterinario.prototype.id,
  VeterinarioRelations
> {

  public readonly historiaClinicas: HasManyRepositoryFactory<HistoriaClinica, typeof Veterinario.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('HistoriaClinicaRepository') protected historiaClinicaRepositoryGetter: Getter<HistoriaClinicaRepository>,
  ) {
    super(Veterinario, dataSource);
    this.historiaClinicas = this.createHasManyRepositoryFactoryFor('historiaClinicas', historiaClinicaRepositoryGetter,);
    this.registerInclusionResolver('historiaClinicas', this.historiaClinicas.inclusionResolver);
  }
}
