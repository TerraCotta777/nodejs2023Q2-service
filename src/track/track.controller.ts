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
import { TrackService } from './track.service';
import { CreateTrackDto, Track } from './track.model';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllArtists(): Promise<Track[]> {
    return this.trackService.getAllTracks();
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe())
  getArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    return this.trackService.getTrack(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createArtist(@Body() dto: CreateTrackDto): Promise<Track> {
    return this.trackService.createTrack(dto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateTrackDto,
  ): Promise<Track> {
    return this.trackService.updateTrack(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.trackService.deleteTrack(id);
  }
}
