import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {HistoriaClinica, HistoriaClinicaRelations, Mascota, Veterinario} from '../models';
import {MascotaRepository} from './mascota.repository';
import {VeterinarioRepository} from './veterinario.repository';

export class HistoriaClinicaRepository extends DefaultCrudRepository<
  HistoriaClinica,
  typeof HistoriaClinica.prototype.id,
  HistoriaClinicaRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof HistoriaClinica.prototype.id>;

  public readonly veterinario: BelongsToAccessor<Veterinario, typeof HistoriaClinica.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('VeterinarioRepository') protected veterinarioRepositoryGetter: Getter<VeterinarioRepository>,
  ) {
    super(HistoriaClinica, dataSource);
    this.veterinario = this.createBelongsToAccessorFor('veterinario', veterinarioRepositoryGetter,);
    this.registerInclusionResolver('veterinario', this.veterinario.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
