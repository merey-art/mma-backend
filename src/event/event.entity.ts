import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fight } from '../fight/fight.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Event {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  @Field(() => String)
  @Column({ type: 'date' })
  eventDate: Date;

  @Field(() => [Fight])
  @OneToMany(() => Fight, f => f.event)
  fights: Fight[];
}
