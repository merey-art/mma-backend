import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWeightClassInput {
  @Field() name: string;
  @Field() minWeight: number;
  @Field() maxWeight: number;
}
