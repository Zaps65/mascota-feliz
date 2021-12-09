import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {PedidoServicio, PedidoServicioRelations, Propietario, Servicios, LineaServicios, Empleado} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {LineaServiciosRepository} from './linea-servicios.repository';
import {ServiciosRepository} from './servicios.repository';
import {EmpleadoRepository} from './empleado.repository';

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

  public readonly empleado: BelongsToAccessor<Empleado, typeof PedidoServicio.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('LineaServiciosRepository') protected lineaServiciosRepositoryGetter: Getter<LineaServiciosRepository>, @repository.getter('ServiciosRepository') protected serviciosRepositoryGetter: Getter<ServiciosRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(PedidoServicio, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.servicios = this.createHasManyThroughRepositoryFactoryFor('servicios', serviciosRepositoryGetter, lineaServiciosRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
