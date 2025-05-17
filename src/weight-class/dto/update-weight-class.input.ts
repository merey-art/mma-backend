import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateWeightClassInput {
  @Field({ nullable: true }) name?: string;
  @Field({ nullable: true }) minWeight?: number;
  @Field({ nullable: true }) maxWeight?: number;
}
