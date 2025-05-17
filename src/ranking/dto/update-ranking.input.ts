// create-fighter.input.ts
import { InputType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class UpdateRankingInput {
  @Field() fighterId: number;
  @Field() position: number;
  @Field(() => GraphQLISODateTime) date: Date;
}
// аналогично — UpdateFighterInput
