import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.entity';

@Controller('rankings')
export class RankingController {
  constructor(private readonly svc: RankingService) {}

  @Post() create(@Body() dto: Partial<Ranking>) {
    return this.svc.create(dto);
  }

  @Get() findAll() {
    return this.svc.findAll();
  }

  @Get(':id') findOne(@Param('id') id: number) {
    return this.svc.findOne(id);
  }

  @Put(':id') update(@Param('id') id: number, @Body() dto: Partial<Ranking>) {
    return this.svc.update(id, dto);
  }

  @Delete(':id') remove(@Param('id') id: number) {
    return this.svc.remove(id);
  }
}
