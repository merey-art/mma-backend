import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventResolver } from './event.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventService, EventResolver],
  controllers: [EventController],
})
export class EventModule {}
