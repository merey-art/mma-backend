import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeightClass } from './weight-class.entity';

@Injectable()
export class WeightClassService {
  constructor(
    @InjectRepository(WeightClass)
    private readonly repo: Repository<WeightClass>,
  ) {}

  create(data: Partial<WeightClass>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({ relations: ['fighters'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['fighters'] });
  }

  update(id: number, data: Partial<WeightClass>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
