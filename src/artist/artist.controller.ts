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
import { ArtistService } from './artist.service';
import { Artist, CreateArtistDto } from './artist.model';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists(): Promise<Artist[]> {
    return await this.artistService.getAllArtists();
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe())
  async getArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return await this.artistService.getArtist(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createArtist(@Body() dto: CreateArtistDto): Promise<Artist> {
    return await this.artistService.createArtist(dto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.updateArtist(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.artistService.deleteArtist(id);
  }
}
