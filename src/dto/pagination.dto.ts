import { BaseEntity } from '../dao/model/base.entity';

export class PaginationDTO<Entity extends BaseEntity> {
  data?: Entity[];
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
}
