import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Servicios, ServiciosRelations, PedidoServicio, LineaServicios} from '../models';
import {LineaServiciosRepository} from './linea-servicios.repository';
import {PedidoServicioRepository} from './pedido-servicio.repository';

export class ServiciosRepository extends DefaultCrudRepository<
  Servicios,
  typeof Servicios.prototype.id,
  ServiciosRelations
> {

  public readonly pedidoServicios: HasManyThroughRepositoryFactory<PedidoServicio, typeof PedidoServicio.prototype.id,
          LineaServicios,
          typeof Servicios.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LineaServiciosRepository') protected lineaServiciosRepositoryGetter: Getter<LineaServiciosRepository>, @repository.getter('PedidoServicioRepository') protected pedidoServicioRepositoryGetter: Getter<PedidoServicioRepository>,
  ) {
    super(Servicios, dataSource);
    this.pedidoServicios = this.createHasManyThroughRepositoryFactoryFor('pedidoServicios', pedidoServicioRepositoryGetter, lineaServiciosRepositoryGetter,);
    this.registerInclusionResolver('pedidoServicios', this.pedidoServicios.inclusionResolver);
  }
}
