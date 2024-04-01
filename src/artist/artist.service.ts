import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist, CreateArtistDto } from './artist.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAllArtists(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async getArtist(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist)
      throw new NotFoundException('Artist with this id is not found');
    return artist;
  }

  async createArtist(dto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({ data: dto });
  }

  async updateArtist(id: string, dto: CreateArtistDto): Promise<Artist> {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new NotFoundException('Artist with this id is not found');
    }
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = this.getArtist(id);
    if (artist) await this.prisma.artist.delete({ where: { id } });
    return;
  }
}
