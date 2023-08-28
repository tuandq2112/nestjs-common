import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BaseEntity } from '../dao/model/base.entity';
import { BaseDTO } from '../dto/base.dto';
import { BaseServiceInterface } from '../interface/base.service.interface';
export class BaseController<Entity extends BaseEntity, DTO extends BaseDTO> {
  constructor(
    private readonly baseService: BaseServiceInterface<Entity, DTO>,
  ) {}

  @Post()
  create(@Body() entity: DTO) {
    return this.baseService.create(entity);
  }
  @Post('batch')
  createBatch(@Body() entities: Entity[]) {
    return this.baseService.createBatch(entities);
  }

  @Get(':id')
  getById(@Param('id') id: any) {
    return this.baseService.getDetail(id);
  }

  @Get()
  search(@Query() query: any) {
    return this.baseService.search(query);
  }
  @Put(':id')
  update(@Param() param: any, @Body() entity: Entity) {
    return this.baseService.update(param.id, entity);
  }

  @Delete(':id')
  delete(@Param('id') id: any) {
    return this.baseService.delete(id);
  }
}
