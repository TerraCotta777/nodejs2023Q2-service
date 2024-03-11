import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { FavoritesResponse } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DbService) {}

  async getAllFavs(): Promise<FavoritesResponse> {
    return this.dbService.fav.findAll();
  }

  async addTrack(id: string) {
    return this.dbService.fav.addTrack(id);
  }

  async removeTrack(id: string) {
    return this.dbService.fav.removeTrack(id);
  }

  async addAlbum(id: string) {
    return this.dbService.fav.addAlbum(id);
  }

  async removeAlbum(id: string) {
    return this.dbService.fav.removeAlbum(id);
  }

  async addArtist(id: string) {
    return this.dbService.fav.addArtist(id);
  }

  async removeArtist(id: string) {
    return this.dbService.fav.removeArtist(id);
  }
}
