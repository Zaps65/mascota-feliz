import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Contrato, ContratoRelations} from '../models';

export class ContratoRepository extends DefaultCrudRepository<
  Contrato,
  typeof Contrato.prototype.id,
  ContratoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Contrato, dataSource);
  }
}
