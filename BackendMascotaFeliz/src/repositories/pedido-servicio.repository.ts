import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PedidoServicio, PedidoServicioRelations, Propietario, Servicios, LineaServicios} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {LineaServiciosRepository} from './linea-servicios.repository';
import {ServiciosRepository} from './servicios.repository';

export class PedidoServicioRepository extends DefaultCrudRepository<
  PedidoServicio,
  typeof PedidoServicio.prototype.id,
  PedidoServicioRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof PedidoServicio.prototype.id>;

  public readonly servicios: HasManyThroughRepositoryFactory<Servicios, typeof Servicios.prototype.id,
          LineaServicios,
          typeof PedidoServicio.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('LineaServiciosRepository') protected lineaServiciosRepositoryGetter: Getter<LineaServiciosRepository>, @repository.getter('ServiciosRepository') protected serviciosRepositoryGetter: Getter<ServiciosRepository>,
  ) {
    super(PedidoServicio, dataSource);
    this.servicios = this.createHasManyThroughRepositoryFactoryFor('servicios', serviciosRepositoryGetter, lineaServiciosRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
