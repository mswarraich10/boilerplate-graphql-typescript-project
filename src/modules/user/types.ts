import { Length, IsEmail, IsOptional } from 'class-validator';
import { User, UserRole } from '../../db/entities/User';
import { Field, InputType, ObjectType } from 'type-graphql';
import { password } from '../../utils/customvalidators/password';

/**
 * Input type of User for validatiopn
 */
@InputType()
export class UserRegisterValidation {
  @Field()
  @Length(3, 50)
  firstName: string;

  @Field()
  @Length(1, 50)
  lastName: string;

  @Field()
  @IsEmail({ message: 'Invalid Email' })
  email: string;

  @Field()
  @password({ message: 'Password must contain special characters' })
  password: string;

  @IsOptional()
  role?: UserRole;

  @Field()
  isAdmin?: boolean;
}

@InputType()
export class UserUpdateValidation {
  @Field({ nullable: true })
  @Length(1, 50)
  firstName: string;

  @Field({ nullable: true })
  @Length(1, 50)
  lastName: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;
}

@InputType()
export class UserLoginType {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class UserOutputType {
  @Field(() => User)
  user: User;

  @Field()
  jwt: string;
}
