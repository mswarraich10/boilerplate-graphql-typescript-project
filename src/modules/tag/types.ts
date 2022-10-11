import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class TagCreateValidation {
  @Field()
  @Length(1, 12)
  name: string;
}
