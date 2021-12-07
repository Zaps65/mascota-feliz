import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, Mascota, PlanesMascotas} from '../models';
import {PlanesMascotasRepository} from './planes-mascotas.repository';
import {MascotaRepository} from './mascota.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly mascotas: HasManyThroughRepositoryFactory<Mascota, typeof Mascota.prototype.id,
          PlanesMascotas,
          typeof Plan.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PlanesMascotasRepository') protected planesMascotasRepositoryGetter: Getter<PlanesMascotasRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Plan, dataSource);
    this.mascotas = this.createHasManyThroughRepositoryFactoryFor('mascotas', mascotaRepositoryGetter, planesMascotasRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
