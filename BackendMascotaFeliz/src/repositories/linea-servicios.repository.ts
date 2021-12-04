import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {LineaServicios, LineaServiciosRelations} from '../models';

export class LineaServiciosRepository extends DefaultCrudRepository<
  LineaServicios,
  typeof LineaServicios.prototype.id,
  LineaServiciosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(LineaServicios, dataSource);
  }
}
