import { Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class TaskCreateValidation {
  @Field()
  @Length(1, 50)
  name: string

  @Field()
  description: string

  @Field({ nullable: true })
  isCompleted: boolean
}

@InputType()
export class TaskUpdateValidation {
  @Field()
  id: number

  @Field({ nullable: true })
  @Length(1, 50)
  name: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  isCompleted: boolean
}
