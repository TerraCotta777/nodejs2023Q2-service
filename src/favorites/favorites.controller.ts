import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './favorites.model';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavs(): Promise<FavoritesResponse> {
    return this.favoritesService.getAllFavs();
  }

  @Post('track/:id')
  async addTrackToFavs(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoritesService.addTrack(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          'Track with given id does not exist',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  async removeTrackFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  async addAlbumToFavs(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoritesService.addAlbum(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          'Album with given id does not exist',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  async removeAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  async addArtistToFavs(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoritesService.addArtist(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          'Track with given id does not exist',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  async removeArtistFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.removeArtist(id);
  }
}
