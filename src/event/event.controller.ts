import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

@Controller('events')
export class EventController {
  constructor(private readonly svc: EventService) {}

  @Post() create(@Body() dto: Partial<Event>) {
    return this.svc.create(dto);
  }

  @Get() findAll() {
    return this.svc.findAll();
  }

  @Get(':id') findOne(@Param('id') id: number) {
    return this.svc.findOne(id);
  }

  @Put(':id') update(@Param('id') id: number, @Body() dto: Partial<Event>) {
    return this.svc.update(id, dto);
  }

  @Delete(':id') remove(@Param('id') id: number) {
    return this.svc.remove(id);
  }
}
