import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {LineaServicios, LineaServiciosRelations} from '../models';

export class LineaServiciosRepository extends DefaultCrudRepository<
  LineaServicios,
  typeof LineaServicios.prototype.id,
  LineaServiciosRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(LineaServicios, dataSource);
  }
}
