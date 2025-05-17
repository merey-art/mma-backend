import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Event } from '../event/event.entity';
import { Fighter } from '../fighter/fighter.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Fight {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Event)
  @ManyToOne(() => Event, e => e.fights)
  event: Event;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, f => f.id)
  fighterA: Fighter;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, f => f.id)
  fighterB: Fighter;

  @Field()
  @Column()
  result: string;

  @Field(() => Fighter, { nullable: true })
  @ManyToOne(() => Fighter, { nullable: true })
  @JoinColumn({ name: 'winnerId' })
  winner?: Fighter;
}

