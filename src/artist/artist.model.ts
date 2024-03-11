import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
