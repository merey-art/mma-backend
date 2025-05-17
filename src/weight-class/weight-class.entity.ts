import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fighter } from '../fighter/fighter.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class WeightClass {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 50 })
  name: string;

  @Field()
  @Column('decimal', { precision: 5, scale: 2 })
  minWeight: number;

  @Field()
  @Column('decimal', { precision: 5, scale: 2 })
  maxWeight: number;

  @Field(() => [Fighter])
  @OneToMany(() => Fighter, f => f.weightClass)
  fighters: Fighter[];
}
