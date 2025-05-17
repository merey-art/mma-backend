import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from './fighter.entity';
import { Fight } from '../fight/fight.entity';
import { FighterStatistics } from './dto/fighter-statistics.dto';

@Injectable()
export class FighterService {
  constructor(
    @InjectRepository(Fighter)
    private readonly fighterRepo: Repository<Fighter>,
    @InjectRepository(Fight)
    private readonly fightRepo: Repository<Fight>,
  ) {}

  async create(fighter: Partial<Fighter>) {
    const saved = await this.fighterRepo.save(fighter);
    return this.fighterRepo.findOne({
      where: { id: saved.id },
      relations: ['weightClass'],
    });

  }

  findAll() {
    return this.fighterRepo.find({ relations: ['weightClass'] });

  }

  findOne(id: number) {
    return this.fighterRepo.findOne({
      where: { id },
      relations: ['weightClass'],
    });

  }

  update(id: number, fighter: Partial<Fighter>) {
    return this.fighterRepo.update(id, fighter);
  }

  remove(id: number) {
    return this.fighterRepo.delete(id);
  }

  async getStatistics(fighterId: number): Promise<FighterStatistics> {
    const fights = await this.fightRepo.find({
      where: [
        { fighterA: { id: fighterId } },
        { fighterB: { id: fighterId } },
      ],
      relations: ['winner'],
    });

    const totalFights = fights.length;
    const totalDraws = fights.filter(f => f.result === 'Draw').length;
    // считаем победы по полю winner
    const totalWins = fights.filter(f => f.winner?.id === fighterId).length;

    return { totalFights, totalWins, totalDraws };
  }

}


