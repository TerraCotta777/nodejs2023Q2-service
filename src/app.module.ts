import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbService } from './db/db.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, ArtistModule, TrackModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
