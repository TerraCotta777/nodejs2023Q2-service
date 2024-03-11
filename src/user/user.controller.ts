import { IsUUID } from 'class-validator';
import { CreateUserDto, UpdatePasswordDto, User } from './user.model';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe())
  getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.createUser(dto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ): Promise<User> {
    return this.userService.updateUser(id, dto);
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe())
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
