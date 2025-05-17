import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
  ) {}

  create(data: Partial<Event>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({ relations: ['fights'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['fights'] });
  }

  update(id: number, data: Partial<Event>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
  findUpcoming() {
    return this.repo.find({
      where: { eventDate: MoreThan(new Date()) },
      relations: ['fights', 'fights.fighterA', 'fights.fighterB'],
    });
  }
}
