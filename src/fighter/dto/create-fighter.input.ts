// create-fighter.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateFighterInput {
  @Field() name: string;
  @Field() birthDate: string;
  @Field(() => Int) weightClassId: number;
}
// аналогично — UpdateFighterInput
