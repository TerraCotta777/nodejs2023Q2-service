import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/user/user.model';
import { v4 as uuidv4 } from 'uuid';

interface DB {
  users: User[];
}

@Injectable()
export class DbService {
  private readonly db: DB = {
    users: [],
  };

  findAllUsers() {
    return this.db.users;
  }

  findUserIndex(id: string): number {
    const index = this.db.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException();
    return index;
  }

  findUser(userId: string) {
    const userIndex = this.findUserIndex(userId);
    return this.db.users[userIndex];
  }

  createUser(dto: CreateUserDto) {
    const user = {
      ...dto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.db.users.push(user);
    return user;
  }

  updateUser(id: string, dto: UpdatePasswordDto) {
    const userIndex = this.findUserIndex(id);
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
  }

  deleteUser(id: string) {
    const userIndex = this.findUserIndex(id);
    this.db.users.splice(userIndex, 1);
    return;
  }
}
