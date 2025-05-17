// src/ranking/ranking-calculator.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Fight } from '../fight/fight.entity';
import { Ranking } from './ranking.entity';
import { Fighter } from '../fighter/fighter.entity';

@Injectable()
export class RankingCalculatorService {
  constructor(
    @InjectRepository(Fight)
    private readonly fightRepo: Repository<Fight>,
    @InjectRepository(Ranking)
    private readonly rankingRepo: Repository<Ranking>,
  ) {}

  async calculate(fight: Fight): Promise<void> {
    // 1) Загрузка связи и проверка
    const fightWithRel = await this.fightRepo.findOne({
      where: { id: fight.id },
      relations: ['fighterA', 'fighterB', 'winner'],
    });
    if (!fightWithRel) {
      // можно выбросить ошибку или просто выйти
      return;
    }

    // 2) Собираем участников
    const participants = [fightWithRel.fighterA, fightWithRel.fighterB];

    for (const fighter of participants) {
      // 3) Забираем все бои этого бойца
      const bouts = await this.fightRepo.find({
        where: [
          { fighterA: { id: fighter.id } },
          { fighterB: { id: fighter.id } },
        ],
        relations: ['winner'],
      });

      // 4) Подсчёт очков
      let points = 0;
      for (const bout of bouts) {
        if (bout.result === 'Draw') {
          points += 1;
        } else if (bout.winner?.id === fighter.id) {
          points += bout.result === 'KO' ? 4 : 3;
        }
      }

      // 5) Ищем или создаём запись рейтинга
      const existing = await this.rankingRepo.findOne({
        where: { fighter: { id: fighter.id } },
      });

      // record — гарантированно Ranking
      const record: Ranking = existing
        ?? this.rankingRepo.create({
          fighter: { id: fighter.id } as any,
        });

      record.position = points;
      record.date     = new Date();

      // 6) Сохраняем — теперь record не может быть null
      await this.rankingRepo.save(record);
    }
  }

}
