import { Repository } from 'typeorm';
import { BaseEntity } from '../model/base.entity';

export interface BaseRepository<Entity extends BaseEntity>
  extends Repository<Entity> {}
