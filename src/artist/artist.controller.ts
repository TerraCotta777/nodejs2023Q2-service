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
  getAllArtists(): Promise<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe())
  getArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return this.artistService.getArtist(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createArtist(@Body() dto: CreateArtistDto): Promise<Artist> {
    return this.artistService.createArtist(dto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateArtistDto,
  ): Promise<Artist> {
    return this.artistService.updateArtist(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.artistService.deleteArtist(id);
  }
}
