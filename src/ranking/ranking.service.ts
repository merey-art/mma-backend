import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from './ranking.entity';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private readonly repo: Repository<Ranking>,
  ) {}

  create(data: Partial<Ranking>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({
      relations: ['fighter'],
      order: { position: 'ASC' },
    });
  }


  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['fighter'] });
  }

  update(id: number, data: Partial<Ranking>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
