import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { FightService } from './fight.service';
import { Fight } from './fight.entity';

@Controller('fights')
export class FightController {
  constructor(private readonly svc: FightService) {}

  @Post() create(@Body() dto: Partial<Fight>) {
    return this.svc.create(dto);
  }

  @Get() findAll() {
    return this.svc.findAll();
  }

  @Get(':id') findOne(@Param('id') id: number) {
    return this.svc.findOne(id);
  }

  @Put(':id') update(@Param('id') id: number, @Body() dto: Partial<Fight>) {
    return this.svc.update(id, dto);
  }

  @Delete(':id') remove(@Param('id') id: number) {
    return this.svc.remove(id);
  }
}
