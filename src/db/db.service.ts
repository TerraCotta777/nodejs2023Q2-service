import { CreateArtistDto } from './../artist/artist.model';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from 'src/artist/artist.model';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/user/user.model';
import { v4 as uuidv4 } from 'uuid';

interface DB {
  users: User[];
  artists: Artist[];
}

@Injectable()
export class DbService {
  private readonly db: DB = {
    users: [],
    artists: [],
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

    findById: (userId: string) => {
      const userIndex = this.user.findUserIndex(userId);
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

    findById: (userId: string) => {
      const artistIndex = this.artist.findArtistIndex(userId);
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
      this.db.artists.splice(artistIndex, 1);
      return;
    },
  };
}
