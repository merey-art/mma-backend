import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './ranking.entity';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { RankingResolver } from './ranking.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking])],
  providers: [RankingService, RankingResolver],
  controllers: [RankingController],
})
export class RankingModule {}
