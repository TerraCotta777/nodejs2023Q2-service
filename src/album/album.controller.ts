import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album, CreateAlbumDto } from './album.model';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllArtists(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe())
  getArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return this.albumService.getAlbum(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createArtist(@Body() dto: CreateAlbumDto): Promise<Album> {
    return this.albumService.createAlbum(dto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateAlbumDto,
  ): Promise<Album> {
    return this.albumService.updateAlbum(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.albumService.deleteAlbum(id);
  }
}
