import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Album, CreateAlbumDto } from './album.model';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DbService) {}

  async getAllAlbums(): Promise<Album[]> {
    return this.dbService.album.findAll();
  }

  async getAlbum(id: string): Promise<Album> {
    return this.dbService.album.findById(id);
  }

  async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    return this.dbService.album.create(dto);
  }

  async updateAlbum(id: string, dto: CreateAlbumDto): Promise<Album> {
    return this.dbService.album.update(id, dto);
  }

  async deleteAlbum(id: string): Promise<void> {
    return this.dbService.album.delete(id);
  }
}
