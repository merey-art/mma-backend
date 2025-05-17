// src/weight-class/weight-class.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WeightClassService } from './weight-class.service';
import { WeightClass } from './weight-class.entity';
import { CreateWeightClassInput } from './dto/create-weight-class.input';
import { UpdateWeightClassInput } from './dto/update-weight-class.input';

@Resolver(() => WeightClass)
export class WeightClassResolver {
  constructor(private readonly svc: WeightClassService) {}

  @Query(() => [WeightClass])
  weightClasses() {
    return this.svc.findAll();
  }

  @Query(() => WeightClass, { nullable: true })
  weightClass(@Args('id', { type: () => Int }) id: number) {
    return this.svc.findOne(id);
  }

  @Mutation(() => WeightClass)
  createWeightClass(
    @Args('input') input: CreateWeightClassInput,
  ) {
    return this.svc.create(input);
  }

  @Mutation(() => WeightClass)
  updateWeightClass(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateWeightClassInput,
  ) {
    return this.svc.update(id, input);
  }

  @Mutation(() => Boolean)
  removeWeightClass(@Args('id', { type: () => Int }) id: number) {
    return this.svc.remove(id).then(() => true);
  }
}
