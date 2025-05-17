import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateFightInput {
  @Field(() => Int) eventId: number;
  @Field(() => Int) fighterAId: number;
  @Field(() => Int) fighterBId: number;
  @Field() result: string;
  @Field(() => Int, { nullable: true })
  winnerId?: number;
}
