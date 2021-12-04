import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PedidoServicio, PedidoServicioRelations, Propietario} from '../models';
import {PropietarioRepository} from './propietario.repository';

export class PedidoServicioRepository extends DefaultCrudRepository<
  PedidoServicio,
  typeof PedidoServicio.prototype.id,
  PedidoServicioRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof PedidoServicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
  ) {
    super(PedidoServicio, dataSource);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
