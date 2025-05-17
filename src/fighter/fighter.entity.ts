import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { WeightClass } from '../weight-class/weight-class.entity';
import { Ranking } from '../ranking/ranking.entity';

@ObjectType()
@Entity()
export class Fighter {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => String)
  @Column({ type: 'date' })
  birthDate: Date;

  @Field(() => WeightClass)
  @ManyToOne(() => WeightClass, wc => wc.fighters)
  weightClass: WeightClass;

  @Field(() => [Ranking])
  @OneToMany(() => Ranking, r => r.fighter)
  rankings: Ranking[];
}

