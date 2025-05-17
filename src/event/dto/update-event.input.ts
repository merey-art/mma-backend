import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput {
  @Field({ nullable: true }) name?: string;
  @Field({ nullable: true }) location?: string;
  @Field(() => GraphQLISODateTime, { nullable: true }) eventDate?: Date;
}
