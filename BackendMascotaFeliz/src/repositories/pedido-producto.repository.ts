import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PedidoProducto, PedidoProductoRelations, Propietario, Productos, LineaProductos} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {LineaProductosRepository} from './linea-productos.repository';
import {ProductosRepository} from './productos.repository';

export class PedidoProductoRepository extends DefaultCrudRepository<
  PedidoProducto,
  typeof PedidoProducto.prototype.id,
  PedidoProductoRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof PedidoProducto.prototype.id>;

  public readonly productos: HasManyThroughRepositoryFactory<Productos, typeof Productos.prototype.id,
          LineaProductos,
          typeof PedidoProducto.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('LineaProductosRepository') protected lineaProductosRepositoryGetter: Getter<LineaProductosRepository>, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(PedidoProducto, dataSource);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productosRepositoryGetter, lineaProductosRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
