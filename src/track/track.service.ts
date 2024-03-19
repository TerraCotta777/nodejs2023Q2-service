import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateTrackDto, Track } from './track.model';

@Injectable()
export class TrackService {
  constructor(private readonly dbService: DbService) {}

  async getAllTracks(): Promise<Track[]> {
    return this.dbService.track.findAll();
  }

  async getTrack(id: string): Promise<Track> {
    return this.dbService.track.findById(id);
  }

  async createTrack(dto: CreateTrackDto): Promise<Track> {
    return this.dbService.track.create(dto);
  }

  async updateTrack(id: string, dto: CreateTrackDto): Promise<Track> {
    return this.dbService.track.update(id, dto);
  }

  async deleteTrack(id: string): Promise<void> {
    return this.dbService.track.delete(id);
  }
}
