import { IsNotEmpty, IsEmail, MaxLength, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty({ message: 'Name are required' })
  @MinLength(1, {message: 'Minimum name length must be 1'})
  @MaxLength(15, {message: 'Maximum name length must be 15'})
  public name!: string;

  @IsNotEmpty({ message: 'Email are required' })
  @IsEmail({}, { message: 'Invalid email address' })
  public email!: string;

  @IsNotEmpty({ message: 'Password are required' })
  @MinLength(6, { message: 'Minimum password length must be 6' })
  @MaxLength(12, { message: 'Maximum password length must be 12' })
  public password!: string;
}
