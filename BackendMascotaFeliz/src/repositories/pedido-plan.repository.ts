import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PedidoPlan, PedidoPlanRelations, Propietario} from '../models';
import {PropietarioRepository} from './propietario.repository';

export class PedidoPlanRepository extends DefaultCrudRepository<
  PedidoPlan,
  typeof PedidoPlan.prototype.id,
  PedidoPlanRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof PedidoPlan.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
  ) {
    super(PedidoPlan, dataSource);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
