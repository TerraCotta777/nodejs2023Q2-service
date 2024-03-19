import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsNotEmpty()
  artistId: string | null;
}
