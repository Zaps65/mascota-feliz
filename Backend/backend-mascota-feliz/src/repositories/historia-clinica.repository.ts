import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {HistoriaClinica, HistoriaClinicaRelations} from '../models';

export class HistoriaClinicaRepository extends DefaultCrudRepository<
  HistoriaClinica,
  typeof HistoriaClinica.prototype.id,
  HistoriaClinicaRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(HistoriaClinica, dataSource);
  }
}
