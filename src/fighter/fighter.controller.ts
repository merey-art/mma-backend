import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { FighterService } from './fighter.service';
import { Fighter } from './fighter.entity';

@Controller('fighters')
export class FighterController {
  constructor(private readonly fighterService: FighterService) {}

  @Post()
  create(@Body() data: Partial<Fighter>) {
    return this.fighterService.create(data);
  }

  @Get()
  findAll() {
    return this.fighterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fighterService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Fighter>) {
    return this.fighterService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fighterService.remove(id);
  }
}
