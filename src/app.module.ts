// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule }      from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { FighterModule }     from './fighter/fighter.module';
import { EventModule }       from './event/event.module';
import { FightModule }       from './fight/fight.module';
import { RankingModule }     from './ranking/ranking.module';
import { WeightClassModule } from './weight-class/weight-class.module';

import { Fighter }    from './fighter/fighter.entity';
import { Event }      from './event/event.entity';
import { Fight }      from './fight/fight.entity';
import { Ranking }    from './ranking/ranking.entity';
import { WeightClass }from './weight-class/weight-class.entity';

@Module({
  imports: [
    // подключаем БД
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'mma_project',
      entities: [Fighter, Event, Fight, Ranking, WeightClass],
      synchronize: true,
    }),
    // глобально регистрировать репозитории не обязательно — это делают в модулях ниже
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),

    // вот они — ваши модули с резолверами и сервисами
    FighterModule,
    EventModule,
    FightModule,
    RankingModule,
    WeightClassModule,
  ],
})
export class AppModule {}
