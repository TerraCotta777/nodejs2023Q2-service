import { Injectable } from '@nestjs/common';
import { Artist, CreateArtistDto } from './artist.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAllArtists(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async getArtist(id: string): Promise<Artist> {
    return await this.prisma.artist.findUnique({
      where: { id },
    });
  }

  async createArtist(dto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({ data: dto });
  }

  async updateArtist(id: string, dto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.update({ where: { id }, data: dto });
  }

  async deleteArtist(id: string): Promise<void> {
    await this.prisma.artist.delete({ where: { id } });
    return;
  }
}
