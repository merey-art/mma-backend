import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field() name: string;
  @Field() location: string;
  @Field(() => GraphQLISODateTime) eventDate: Date;
}
