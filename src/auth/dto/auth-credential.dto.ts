import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(10)
  nickname?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/, {
    message: '비밀번호는 영문, 숫자 조합으로 8자리 이상 15자리 이하만 가능 합니다.',
  })
  password: string;
}
