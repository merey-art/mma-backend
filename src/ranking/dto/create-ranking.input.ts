// create-Ranking.input.ts
import { InputType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreateRankingInput {
  @Field() fighterId: number;
  @Field() position: number;
  @Field(() => GraphQLISODateTime) date: Date;
}
// аналогично — UpdateRankingInput
