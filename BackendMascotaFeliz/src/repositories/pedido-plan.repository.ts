import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {PedidoPlan, PedidoPlanRelations, Propietario, Mascota, Planes, LineaPlanes, Empleado} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {MascotaRepository} from './mascota.repository';
import {LineaPlanesRepository} from './linea-planes.repository';
import {PlanesRepository} from './planes.repository';
import {EmpleadoRepository} from './empleado.repository';

export class PedidoPlanRepository extends DefaultCrudRepository<
  PedidoPlan,
  typeof PedidoPlan.prototype.id,
  PedidoPlanRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof PedidoPlan.prototype.id>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof PedidoPlan.prototype.id>;

  public readonly planes: HasManyThroughRepositoryFactory<Planes, typeof Planes.prototype.id,
          LineaPlanes,
          typeof PedidoPlan.prototype.id
        >;

  public readonly empleado: BelongsToAccessor<Empleado, typeof PedidoPlan.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('LineaPlanesRepository') protected lineaPlanesRepositoryGetter: Getter<LineaPlanesRepository>, @repository.getter('PlanesRepository') protected planesRepositoryGetter: Getter<PlanesRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(PedidoPlan, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.planes = this.createHasManyThroughRepositoryFactoryFor('planes', planesRepositoryGetter, lineaPlanesRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
