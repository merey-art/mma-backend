import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './fighter/fighter.entity';
import { Event } from './event/event.entity';
import { Fight } from './fight/fight.entity';
import { Ranking } from './ranking/ranking.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ваш_логин',
      password: 'ваш_пароль',
      database: 'имя_вашей_базы',
      entities: [Fighter, Event, Fight, Ranking],
      synchronize: true, // true для dev-режима (создаёт таблицы)
    }),
    TypeOrmModule.forFeature([Fighter, Event, Fight, Ranking]),
  ],
})
export class AppModule {}
