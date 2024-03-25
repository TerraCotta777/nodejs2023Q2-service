import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto, Track } from './track.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getAllTracks(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async getTrack(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) throw new NotFoundException('Track was not found');
    return track;
  }

  async createTrack(dto: CreateTrackDto): Promise<Track> {
    return await this.prisma.track.create({ data: dto });
  }

  async updateTrack(id: string, dto: CreateTrackDto): Promise<Track> {
    const track = await this.prisma.track.update({ where: { id }, data: dto });
    if (!track) throw new NotFoundException('Track was not found');
    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    const track = this.getTrack(id);
    if (track) await this.prisma.track.delete({ where: { id } });
    return;
  }
}
