// src/fighter/dto/fighter-statistics.dto.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FighterStatistics {
  @Field(() => Int) totalFights: number;
  @Field(() => Int) totalWins: number;
  @Field(() => Int) totalDraws: number;
}
