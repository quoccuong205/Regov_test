import { IsString, IsNotEmpty } from 'class-validator';

export class CredentialInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  identity_number: string;

  @IsString()
  @IsNotEmpty()
  birth_year: string;
}
