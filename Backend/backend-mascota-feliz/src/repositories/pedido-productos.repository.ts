import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {PedidoProductos, PedidoProductosRelations, Propietario, Productos, LineaProductos} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {LineaProductosRepository} from './linea-productos.repository';
import {ProductosRepository} from './productos.repository';

export class PedidoProductosRepository extends DefaultCrudRepository<
  PedidoProductos,
  typeof PedidoProductos.prototype.id,
  PedidoProductosRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof PedidoProductos.prototype.id>;

  public readonly productos: HasManyThroughRepositoryFactory<Productos, typeof Productos.prototype.id,
          LineaProductos,
          typeof PedidoProductos.prototype.id
        >;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('LineaProductosRepository') protected lineaProductosRepositoryGetter: Getter<LineaProductosRepository>, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(PedidoProductos, dataSource);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productosRepositoryGetter, lineaProductosRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
