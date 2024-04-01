import { Injectable, NotFoundException } from '@nestjs/common';
import { Album, CreateAlbumDto } from './album.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAllAlbums(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async getAlbum(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException('Album was not found');
    return album;
  }

  async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    return await this.prisma.album.create({ data: dto });
  }

  async updateAlbum(id: string, dto: CreateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.update({ where: { id }, data: dto });
    if (!album) throw new NotFoundException('Album was not found');
    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.getAlbum(id);
    if (album) await this.prisma.album.delete({ where: { id } });
    return;
  }
}
