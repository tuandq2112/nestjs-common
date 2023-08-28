import { Column, ObjectId, ObjectIdColumn } from 'typeorm';
import { AuditEntity } from './audit.entity';

export class BaseEntity extends AuditEntity {
  @ObjectIdColumn()
  id: ObjectId | string;
  
  @Column('boolean', { default: true })
  private active: boolean = true;
}
