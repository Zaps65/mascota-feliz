import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {SolicitudAfiliacion, SolicitudAfiliacionRelations} from '../models';

export class SolicitudAfiliacionRepository extends DefaultCrudRepository<
  SolicitudAfiliacion,
  typeof SolicitudAfiliacion.prototype.id,
  SolicitudAfiliacionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(SolicitudAfiliacion, dataSource);
  }
}
