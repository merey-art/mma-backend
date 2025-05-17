import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { WeightClassService } from './weight-class.service';
import { WeightClass } from './weight-class.entity';

@Controller('weight-classes')
export class WeightClassController {
  constructor(private readonly svc: WeightClassService) {}

  @Post() create(@Body() dto: Partial<WeightClass>) {
    return this.svc.create(dto);
  }

  @Get() findAll() {
    return this.svc.findAll();
  }

  @Get(':id') findOne(@Param('id') id: number) {
    return this.svc.findOne(id);
  }

  @Put(':id') update(@Param('id') id: number, @Body() dto: Partial<WeightClass>) {
    return this.svc.update(id, dto);
  }

  @Delete(':id') remove(@Param('id') id: number) {
    return this.svc.remove(id);
  }
}
