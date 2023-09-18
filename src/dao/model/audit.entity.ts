import { ObjectId } from 'mongoose';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditEntity {
  @Column()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column()
  createdBy: ObjectId | String | Number;

  @Column()
  updatedBy: ObjectId | String | Number;
}
