import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.entity';
import { CreateRankingInput } from './dto/create-ranking.input';
import { UpdateRankingInput } from './dto/update-ranking.input';

@Resolver(() => Ranking)
export class RankingResolver {
  constructor(private readonly svc: RankingService) {}

  @Query(() => [Ranking])
  Rankings() {
    return this.svc.findAll();
  }

  @Query(() => Ranking, { nullable: true })
  Ranking(@Args('id', { type: () => Int }) id: number) {
    return this.svc.findOne(id);
  }

  @Mutation(() => Ranking)
  async createRanking(@Args('input') input: CreateRankingInput) {
    const dto: Partial<Ranking> = {
      fighter: { id: input.fighterId } as any,
      position: input.position,
      date: new Date(input.date),
    };
    return this.svc.create(dto);
  }

  @Mutation(() => Ranking)
  async updateRanking(@Args('input') input: CreateRankingInput) {
    const dto: Partial<Ranking> = {
      fighter: { id: input.fighterId } as any,
      position: input.position,
      date: new Date(input.date),
    };
    return this.svc.create(dto);
  }


  @Mutation(() => Boolean)
  removeRanking(@Args('id', { type: () => Int }) id: number) {
    return this.svc.remove(id).then(() => true);
  }
}
