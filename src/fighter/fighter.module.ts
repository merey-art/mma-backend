// src/fighter/fighter.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Fighter } from './fighter.entity';
import { Fight }   from '../fight/fight.entity';
import { FighterService }  from './fighter.service';
import { FighterResolver } from './fighter.resolver';
import { FightModule }     from '../fight/fight.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fighter, Fight]),   // регистрируем оба репозитория
    forwardRef(() => FightModule),                // импортируем модуль с FightService
  ],
  providers: [FighterService, FighterResolver],
  exports: [FighterService],
})
export class FighterModule {}
