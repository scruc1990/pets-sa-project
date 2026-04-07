import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}