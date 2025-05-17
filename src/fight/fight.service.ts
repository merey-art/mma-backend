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

  async create(data: Partial<Fight>): Promise<Fight | null> {
    const saved = await this.repo.save(data);
    return this.repo.findOne({
      where: { id: saved.id },
      relations: ['fighterA', 'fighterB', 'winner', 'event'],
    });
  }


  findAll() {
    return this.repo.find({ relations: ['event', 'fighterA', 'fighterB'] });
  }

  async findOne(id: number): Promise<Fight | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['fighterA', 'fighterB', 'winner', 'event'],
    });
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