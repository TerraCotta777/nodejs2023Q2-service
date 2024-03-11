import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto, UpdatePasswordDto, User } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async getAllUsers(): Promise<User[]> {
    return this.dbService.findAllUsers();
  }

  async getUser(id: string): Promise<User> {
    return this.dbService.findUser(id);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.dbService.createUser(dto);
    return user;
  }

  async updateUser(id: string, dto: UpdatePasswordDto): Promise<User> {
    const user = this.dbService.updateUser(id, dto);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    return this.dbService.deleteUser(id);
  }
}
