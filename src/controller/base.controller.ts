import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BaseEntity } from '../dao/model/base.entity';
import { BaseDTO } from '../dto/base.dto';
import { BaseServiceInterface } from '../interface/base.service.interface';
export class BaseController<Entity extends BaseEntity, DTO extends BaseDTO> {
  constructor(private readonly baseService: BaseServiceInterface<Entity>) {}

  @Post()
  create(@Body() dto: DTO) {
    return this.baseService.create(dto);
  }
  @Post('batch')
  createBatch(@Body() dtos: Entity[]) {
    return this.baseService.createBatch(dtos);
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
  update(@Param() param: any, @Body() dto: DTO) {
    return this.baseService.update(param.id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: any) {
    return this.baseService.delete(id);
  }
}
