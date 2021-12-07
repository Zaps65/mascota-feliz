import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {PedidoPlan, PedidoPlanRelations} from '../models';

export class PedidoPlanRepository extends DefaultCrudRepository<
  PedidoPlan,
  typeof PedidoPlan.prototype.id,
  PedidoPlanRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(PedidoPlan, dataSource);
  }
}
