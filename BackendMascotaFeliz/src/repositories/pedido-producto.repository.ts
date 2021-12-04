import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PedidoProducto, PedidoProductoRelations, Propietario} from '../models';
import {PropietarioRepository} from './propietario.repository';

export class PedidoProductoRepository extends DefaultCrudRepository<
  PedidoProducto,
  typeof PedidoProducto.prototype.id,
  PedidoProductoRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof PedidoProducto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
  ) {
    super(PedidoProducto, dataSource);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
