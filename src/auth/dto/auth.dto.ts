import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  secondName: string;

  @IsNotEmpty()
  password: string;
}
