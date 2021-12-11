import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {HistorialVisitaDomiciliaria, HistorialVisitaDomiciliariaRelations, Mascota, Empleado} from '../models';
import {MascotaRepository} from './mascota.repository';
import {EmpleadoRepository} from './empleado.repository';

export class HistorialVisitaDomiciliariaRepository extends DefaultCrudRepository<
  HistorialVisitaDomiciliaria,
  typeof HistorialVisitaDomiciliaria.prototype.id,
  HistorialVisitaDomiciliariaRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof HistorialVisitaDomiciliaria.prototype.id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof HistorialVisitaDomiciliaria.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(HistorialVisitaDomiciliaria, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
