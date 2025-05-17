
import { UpdateEventInput } from './dto/update-event.input';
import { CreateEventInput } from './dto/create-event.input';
import { EventService } from './event.service';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Event } from './event.entity';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly svc: EventService) {}

  @Query(() => [Event])
  events() {
    return this.svc.findAll();
  }

  @Query(() => Event, { nullable: true })
  event(@Args('id', { type: () => Int }) id: number) {
    return this.svc.findOne(id);
  }

  @Mutation(() => Event)
  createEvent(@Args('input') input: CreateEventInput) {
    return this.svc.create(input);
  }

  @Mutation(() => Event)
  updateEvent(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateEventInput,
  ) {
    return this.svc.update(id, input);
  }

  @Mutation(() => Boolean)
  removeEvent(@Args('id', { type: () => Int }) id: number) {
    return this.svc.remove(id).then(() => true);
  }
  @Query(() => [Event])
  upcomingEvents() {
    return this.svc.findUpcoming();
  }

}
