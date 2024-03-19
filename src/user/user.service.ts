import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
  UserForResponse,
} from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  deletePassword = (user: User): UserForResponse => {
    const result = user;
    delete result.password;
    return result;
  };

  async getAllUsers(): Promise<UserForResponse[]> {
    const users = this.dbService.user.findAll();
    const usersToSend = [...users];
    return usersToSend.map((user) => this.deletePassword(user));
  }

  async getUser(id: string): Promise<UserForResponse> {
    const user = this.dbService.user.findById(id);
    const userToSend = { ...user };
    return this.deletePassword(userToSend);
  }

  async createUser(dto: CreateUserDto): Promise<UserForResponse> {
    const user = this.dbService.user.create(dto);
    const userToSend = { ...user };
    return this.deletePassword(userToSend);
  }

  async updateUser(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<UserForResponse> {
    const user = this.dbService.user.update(id, dto);
    const userToSend = { ...user };
    return this.deletePassword(userToSend);
  }

  async deleteUser(id: string): Promise<void> {
    return this.dbService.user.delete(id);
  }
}
