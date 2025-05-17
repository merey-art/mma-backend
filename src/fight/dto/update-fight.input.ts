import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateFightInput {
  @Field({ nullable: true }) result?: string;
  @Field(() => Int, { nullable: true }) winnerId?: number;
}
