
import { Fight } from './fight.entity';
import { FightService } from './fight.service';
import { Args, Int, Query, Mutation, Resolver } from '@nestjs/graphql';
import { CreateFightInput } from "./dto/create-fight.input";
import { UpdateFightInput } from './dto/update-fight.input';

@Resolver(() => Fight)
export class FightResolver {
  constructor(private readonly svc: FightService) {}

  @Query(() => [Fight])
  fights() {
    return this.svc.findAll();
  }

  @Query(() => Fight, { nullable: true })
  fight(@Args('id', { type: () => Int }) id: number) {
    return this.svc.findOne(id);
  }

  @Mutation(() => Fight)
  createFight(@Args('input') input: CreateFightInput) {
    const dto: Partial<Fight> = {
      event:   { id: input.eventId   } as any,
      fighterA:{ id: input.fighterAId} as any,
      fighterB:{ id: input.fighterBId} as any,
      result:   input.result,
      winner:   input.winnerId
        ? ({ id: input.winnerId } as any)
        : null,
    };
    return this.svc.create(dto);
  }

  @Mutation(() => Fight)
  updateFight(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateFightInput,
  ) {
    const dto: Partial<Fight> = {
      ...(input.result   !== undefined && { result: input.result }),
      ...(input.winnerId !== undefined && {
        winner: input.winnerId
          ? ({ id: input.winnerId } as any)
          : null
      }),
    };
    return this.svc.update(id, dto);
  }

  @Mutation(() => Boolean)
  removeFight(@Args('id', { type: () => Int }) id: number) {
    return this.svc.remove(id).then(() => true);
  }
}
