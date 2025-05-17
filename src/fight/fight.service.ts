import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from './fight.entity';

@Injectable()
export class FightService {
  constructor(
    @InjectRepository(Fight)
    private readonly repo: Repository<Fight>,
  ) {}

  create(data: Partial<Fight>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({ relations: ['event', 'fighterA', 'fighterB'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['event', 'fighterA', 'fighterB'] });
  }

  update(id: number, data: Partial<Fight>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  findByFighter(fighterId: number) {
    return this.repo.find({
      where: [
        { fighterA: { id: fighterId } },
        { fighterB: { id: fighterId } },
      ],
      relations: ['event', 'fighterA', 'fighterB'],
    });
  }
}
