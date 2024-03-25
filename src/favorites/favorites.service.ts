import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Favorites, FavoritesResponse } from './favorites.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  private itemToModel: any;
  constructor(private prisma: PrismaService) {
    this.itemToModel = {
      artist: this.prisma.artist,
      album: this.prisma.album,
      track: this.prisma.track,
    };
  }

  async getAllFavs(): Promise<FavoritesResponse> {
    const fav = await this.prisma.favorites.findFirst();
    if (!fav) return { artists: [], albums: [], tracks: [] };
    else {
      const tracks = await this.prisma.track.findMany({
        where: { id: { in: fav.tracks } },
      });
      const artists = await this.prisma.artist.findMany({
        where: { id: { in: fav.artists } },
      });
      const albums = await this.prisma.album.findMany({
        where: { id: { in: fav.albums } },
      });
      return { artists, albums, tracks };
    }
  }

  // async createFavorite(id: string, type: 'artist' | 'album' | 'track') {
  //   const itemExists = await this.itemExists(id, type);
  //   if (!itemExists) {
  //     throw new HttpException(
  //       `${type} with ID ${id} not found`,
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }

  //   let favorite = await this.prisma.favorites.findFirst();
  //   if (favorite) {
  //     favorite = await this.prisma.favorites.update({
  //       where: { favoriteId: favorite.favoriteId },
  //       data: this.getUpdateData(type, id, favorite),
  //     });
  //   } else {
  //     favorite = await this.prisma.favorites.create({
  //       data: this.getCreateData(type, id),
  //     });
  //   }

  //   return favorite;
  // }

  private async createOrUpdateFavorite(
    item: string,
    id: string,
    favorite: Favorites,
  ) {
    if (favorite) {
      return await this.prisma.favorites.update({
        where: { favoriteId: favorite.favoriteId },
        data: this.getUpdateData(item, id, favorite),
      });
    } else {
      return await this.prisma.favorites.create({
        data: this.getCreateData(item, id),
      });
    }
  }
  private async itemExists(
    id: string,
    item: 'artist' | 'album' | 'track',
  ): Promise<boolean> {
    const res = await this.itemToModel[item].findUnique({ where: { id } });
    console.log('itemExists ======', res);
    return res;
  }

  private getUpdateData(type: string, id: string, favorite: any) {
    const updateData = {};
    switch (type) {
      case 'artist':
        updateData['artists'] = { set: [...favorite.artists, id] };
        break;

      case 'album':
        updateData['albums'] = { set: [...favorite.albums, id] };
        break;

      case 'track':
        updateData['tracks'] = { set: [...favorite.tracks, id] };
        break;
    }
    return updateData;
  }

  private getCreateData(type: string, id: string) {
    const createData = { artists: [], albums: [], tracks: [] };
    switch (type) {
      case 'artist':
        createData.artists.push(id);
        break;

      case 'album':
        createData.albums.push(id);
        break;

      case 'track':
        createData.tracks.push(id);
        break;
    }
    return createData;
  }

  async addTrack(id: string) {
    const trackExists = await this.itemExists(id, 'track');
    if (!trackExists) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      console.log(trackExists);
      let favorites = await this.prisma.favorites.findFirst();
      favorites = await this.createOrUpdateFavorite('track', id, favorites);
      return favorites;
    }
  }

  async removeTrack(id: string) {
    const favorites = await this.prisma.favorites.findFirst();
    if (favorites.tracks.includes(id)) {
      await this.prisma.favorites.update({
        where: { favoriteId: favorites.favoriteId },
        data: {
          tracks: {
            set: favorites.tracks.filter((trackId) => trackId !== id),
          },
        },
      });
    }
  }

  async addAlbum(id: string) {
    const albumExists = await this.itemExists(id, 'album');
    if (!albumExists) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    let favorites = await this.prisma.favorites.findFirst();
    favorites = await this.createOrUpdateFavorite('album', id, favorites);
    return favorites;
  }

  async removeAlbum(id: string) {
    const favorites = await this.prisma.favorites.findFirst();
    if (favorites.albums.includes(id)) {
      await this.prisma.favorites.update({
        where: { favoriteId: favorites.favoriteId },
        data: {
          albums: {
            set: favorites.albums.filter((albumId) => albumId !== id),
          },
        },
      });
    }
  }

  async addArtist(id: string) {
    const artistExists = await this.itemExists(id, 'artist');
    if (!artistExists) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    let favorites = await this.prisma.favorites.findFirst();
    favorites = await this.createOrUpdateFavorite('artist', id, favorites);
    return favorites;
  }

  async removeArtist(id: string) {
    const favorites = await this.prisma.favorites.findFirst();
    if (favorites.artists.includes(id)) {
      await this.prisma.favorites.update({
        where: { favoriteId: favorites.favoriteId },
        data: {
          artists: {
            set: favorites.artists.filter((artistId) => artistId !== id),
          },
        },
      });
    }
  }
}
