// src/fighter/fighter.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FighterService } from './fighter.service';
import { Fighter } from './fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';
import { FighterStatistics } from './dto/fighter-statistics.dto';
import { Fight } from 'src/fight/fight.entity';
import { FightService } from '../fight/fight.service';

@Resolver(() => Fighter)
export class FighterResolver {
  constructor(
    private readonly svc: FighterService,
    private readonly fightSvc: FightService,
  ) {}


  @Query(() => [Fighter])
  fighters() {
    return this.svc.findAll();
  }

  @Query(() => Fighter, { nullable: true })
  fighter(@Args('id', { type: () => Int }) id: number) {
    return this.svc.findOne(id);
  }

  @Mutation(() => Fighter)
  createFighter(@Args('input') input: CreateFighterInput) {
    const dto: Partial<Fighter> = {
      ...input,
      birthDate: new Date(input.birthDate),
    };
    return this.svc.create(dto);
  }


  @Mutation(() => Fighter)
  updateFighter(@Args('input') input: UpdateFighterInput) {
    const dto: Partial<Fighter> = {
      ...input,
      birthDate: new Date(input.birthDate),
    };
    return this.svc.create(dto);
  }


  @Mutation(() => Boolean)
  removeFighter(@Args('id', { type: () => Int }) id: number) {
    return this.svc.remove(id).then(() => true);
  }

  @Query(() => [Fight])
  fightHistory(@Args('fighterId', { type: () => Int }) fighterId: number) {
    return this.fightSvc.findByFighter(fighterId);
  }

  // агрегированная статистика
  @Query(() => FighterStatistics)
  async fighterStatistics(
    @Args('fighterId', { type: () => Int }) fighterId: number,
  ): Promise<FighterStatistics> {
    return this.svc.getStatistics(fighterId);
  }
}
