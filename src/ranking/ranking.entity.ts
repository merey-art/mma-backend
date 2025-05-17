import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fighter } from '../fighter/fighter.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Ranking {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, f => f.rankings)
  fighter: Fighter;

  @Field(() => Int)
  @Column()
  position: number;

  @Field(() => String)
  @Column({ type: 'date' })
  date: Date;
}
