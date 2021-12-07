import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, HistorialVisitaDomiciliaria} from '../models';
import {HistorialVisitaDomiciliariaRepository} from './historial-visita-domiciliaria.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly historialVisitaDomiciliarias: HasManyRepositoryFactory<HistorialVisitaDomiciliaria, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('HistorialVisitaDomiciliariaRepository') protected historialVisitaDomiciliariaRepositoryGetter: Getter<HistorialVisitaDomiciliariaRepository>,
  ) {
    super(Empleado, dataSource);
    this.historialVisitaDomiciliarias = this.createHasManyRepositoryFactoryFor('historialVisitaDomiciliarias', historialVisitaDomiciliariaRepositoryGetter,);
    this.registerInclusionResolver('historialVisitaDomiciliarias', this.historialVisitaDomiciliarias.inclusionResolver);
  }
}
