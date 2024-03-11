import { DbService } from './db.service';
import {
  Body,
  Controller,
  // Get,
  // Param,
  // ParseIntPipe,
  // Post,
} from '@nestjs/common';
import { CreateUserDto, User } from 'src/user/user.model';

@Controller()
export class DbController {
  constructor(private readonly dbService: DbService) {}

  // @Get()
  getAllUsers(): User[] {
    return this.dbService.findAllUsers();
  }

  // @Get()
  getUser(id: string): User {
    return this.dbService.findUser(id);
  }

  // @Post()
  createUser(@Body() item: CreateUserDto): User {
    return this.dbService.createUser(item);
  }
}
