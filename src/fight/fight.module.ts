// src/fight/fight.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Fight } from './fight.entity';
import { FightService } from './fight.service';
import { FightResolver } from './fight.resolver';  // если есть

@Module({
  imports: [TypeOrmModule.forFeature([Fight])],
  providers: [FightService, FightResolver],
  exports: [FightService],        // ← экспортируем сервис
})
export class FightModule {}
