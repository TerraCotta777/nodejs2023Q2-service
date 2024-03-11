import { Album, CreateAlbumDto } from 'src/album/album.model';
import { CreateArtistDto } from './../artist/artist.model';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from 'src/artist/artist.model';
import { CreateTrackDto, Track } from 'src/track/track.model';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/user/user.model';
import { v4 as uuidv4 } from 'uuid';
import { Favorites } from 'src/favorites/favorites.model';

interface DB {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favs: Favorites;
}

@Injectable()
export class DbService {
  private readonly db: DB = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favs: { artists: [], albums: [], tracks: [] },
  };

  user = {
    findAll: () => {
      return this.db.users;
    },

    findUserIndex: (id: string): number => {
      const index = this.db.users.findIndex((user: User) => user.id === id);
      if (index === -1) throw new NotFoundException();
      return index;
    },

    findById: (id: string) => {
      const userIndex = this.user.findUserIndex(id);
      return this.db.users[userIndex];
    },

    create: (dto: CreateUserDto) => {
      const user = {
        ...dto,
        id: uuidv4(),
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      this.db.users.push(user);
      return user;
    },

    update: (id: string, dto: UpdatePasswordDto) => {
      const userIndex = this.user.findUserIndex(id);
      const user = this.db.users[userIndex];
      if (user.password === dto.oldPassword) {
        user.version += 1;
        user.password = dto.newPassword;
        user.updatedAt = Date.now();
        this.db.users[userIndex] = user;
        return user;
      } else {
        throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
      }
    },

    delete: (id: string) => {
      const userIndex = this.user.findUserIndex(id);
      this.db.users.splice(userIndex, 1);
      return;
    },
  };

  artist = {
    findAll: () => {
      return this.db.artists;
    },

    findArtistIndex: (id: string): number => {
      const index = this.db.artists.findIndex((artist) => artist.id === id);
      if (index === -1) throw new NotFoundException();
      return index;
    },

    findById: (id: string) => {
      const artistIndex = this.artist.findArtistIndex(id);
      return this.db.artists[artistIndex];
    },

    create: (dto: CreateArtistDto) => {
      const artist = {
        ...dto,
        id: uuidv4(),
      };
      this.db.artists.push(artist);
      return artist;
    },

    update: (id: string, dto: CreateArtistDto) => {
      const artistIndex = this.artist.findArtistIndex(id);
      let artist = this.db.artists[artistIndex];
      artist = { id: artist.id, ...dto };
      this.db.artists[artistIndex] = artist;
      return artist;
    },

    delete: (id: string) => {
      const artistIndex = this.artist.findArtistIndex(id);
      this.db.tracks.map((track) => {
        if (track.artistId === id) track.artistId = null;
      });
      this.db.albums.map((album) => {
        if (album.artistId === id) album.artistId = null;
      });
      this.db.artists.splice(artistIndex, 1);
      return;
    },
  };

  track = {
    findAll: () => {
      return this.db.tracks;
    },

    findTrackIndex: (id: string): number => {
      const index = this.db.tracks.findIndex((track) => track.id === id);
      if (index === -1) throw new NotFoundException();
      else return index;
    },

    findById: (id: string) => {
      const trackIndex = this.track.findTrackIndex(id);
      return this.db.tracks[trackIndex];
    },

    create: (dto: CreateTrackDto) => {
      const track = {
        ...dto,
        id: uuidv4(),
      };
      this.db.tracks.push(track);
      return track;
    },

    update: (id: string, dto: CreateTrackDto) => {
      const trackIndex = this.track.findTrackIndex(id);
      let track = this.db.tracks[trackIndex];
      track = { id: track.id, ...dto };
      this.db.tracks[trackIndex] = track;
      return track;
    },

    delete: (id: string) => {
      const trackIndex = this.track.findTrackIndex(id);
      this.db.tracks.splice(trackIndex, 1);
      return;
    },
  };

  album = {
    findAll: () => {
      return this.db.albums;
    },

    findAlbumIndex: (id: string): number => {
      const index = this.db.albums.findIndex((album) => album.id === id);
      if (index === -1) throw new NotFoundException();
      return index;
    },

    findById: (id: string) => {
      const albumIndex = this.album.findAlbumIndex(id);
      return this.db.albums[albumIndex];
    },

    create: (dto: CreateAlbumDto) => {
      const album = {
        ...dto,
        id: uuidv4(),
      };
      this.db.albums.push(album);
      return album;
    },

    update: (id: string, dto: CreateAlbumDto) => {
      const albumIndex = this.album.findAlbumIndex(id);
      let album = this.db.albums[albumIndex];
      album = { id: album.id, ...dto };
      this.db.albums[albumIndex] = album;
      return album;
    },

    delete: (id: string) => {
      const albumIndex = this.album.findAlbumIndex(id);
      this.db.tracks.map((track) => {
        if (track.albumId === id) track.albumId = null;
      });
      this.db.albums.splice(albumIndex, 1);
      return;
    },
  };

  fav = {
    findAll: () => {
      const tracks = this.db.favs.tracks
        .map((trackId) => this.db.tracks.find((track) => track.id === trackId))
        .filter((track) => track !== null && track !== undefined);
      const albums = this.db.favs.albums
        .map((albumId) => this.db.albums.find((album) => album.id === albumId))
        .filter((album) => album !== null && album !== undefined);
      const artists = this.db.favs.artists
        .map((artistId) =>
          this.db.artists.find((artist) => artist.id === artistId),
        )
        .filter((artist) => artist !== null && artist !== undefined);
      return { tracks, albums, artists };
    },

    addTrack: (id: string) => {
      this.track.findTrackIndex(id);
      return this.db.favs.tracks.push(id);
    },

    removeTrack: (id: string) => {
      const favTrackIndex = this.db.favs.tracks.findIndex(
        (track) => track === id,
      );
      if (favTrackIndex === -1) throw new NotFoundException();
      else this.db.favs.tracks.splice(favTrackIndex, 1);
    },

    addAlbum: (id: string) => {
      this.album.findAlbumIndex(id);
      return this.db.favs.albums.push(id);
    },

    removeAlbum: (id: string) => {
      const favAlbumIndex = this.db.favs.albums.findIndex(
        (album) => album === id,
      );
      if (favAlbumIndex === -1) throw new NotFoundException();
      else this.db.favs.albums.splice(favAlbumIndex, 1);
    },

    addArtist: (id: string) => {
      this.artist.findArtistIndex(id);
      return this.db.favs.artists.push(id);
    },

    removeArtist: (id: string) => {
      const favArtistIndex = this.db.favs.artists.findIndex(
        (artist) => artist === id,
      );
      if (favArtistIndex === -1) throw new NotFoundException();
      else this.db.favs.artists.splice(favArtistIndex, 1);
    },
  };
}
