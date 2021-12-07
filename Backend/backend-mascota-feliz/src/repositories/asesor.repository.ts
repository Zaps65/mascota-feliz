import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Asesor, AsesorRelations, SolicitudAfiliacion} from '../models';
import {SolicitudAfiliacionRepository} from './solicitud-afiliacion.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly solicitudAfiliacions: HasManyRepositoryFactory<SolicitudAfiliacion, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('SolicitudAfiliacionRepository') protected solicitudAfiliacionRepositoryGetter: Getter<SolicitudAfiliacionRepository>,
  ) {
    super(Asesor, dataSource);
    this.solicitudAfiliacions = this.createHasManyRepositoryFactoryFor('solicitudAfiliacions', solicitudAfiliacionRepositoryGetter,);
    this.registerInclusionResolver('solicitudAfiliacions', this.solicitudAfiliacions.inclusionResolver);
  }
}
