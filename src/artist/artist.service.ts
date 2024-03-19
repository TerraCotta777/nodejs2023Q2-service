import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Artist, CreateArtistDto } from './artist.model';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: DbService) {}

  async getAllArtists(): Promise<Artist[]> {
    return this.dbService.artist.findAll();
  }

  async getArtist(id: string): Promise<Artist> {
    return this.dbService.artist.findById(id);
  }

  async createArtist(dto: CreateArtistDto): Promise<Artist> {
    return this.dbService.artist.create(dto);
  }

  async updateArtist(id: string, dto: CreateArtistDto): Promise<Artist> {
    return this.dbService.artist.update(id, dto);
  }

  async deleteArtist(id: string): Promise<void> {
    return this.dbService.artist.delete(id);
  }
}
