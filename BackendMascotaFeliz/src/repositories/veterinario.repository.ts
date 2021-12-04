import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Veterinario, VeterinarioRelations} from '../models';

export class VeterinarioRepository extends DefaultCrudRepository<
  Veterinario,
  typeof Veterinario.prototype.id,
  VeterinarioRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Veterinario, dataSource);
  }
}
