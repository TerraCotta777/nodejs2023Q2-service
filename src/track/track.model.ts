import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class Track {
  id: string;
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  artistId: string | null;

  @IsOptional()
  @IsNotEmpty()
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
