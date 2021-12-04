import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PlanMascota, PlanMascotaRelations} from '../models';

export class PlanMascotaRepository extends DefaultCrudRepository<
  PlanMascota,
  typeof PlanMascota.prototype.id,
  PlanMascotaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PlanMascota, dataSource);
  }
}
