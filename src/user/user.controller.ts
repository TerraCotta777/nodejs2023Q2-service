import {
  CreateUserDto,
  UpdatePasswordDto,
  UserForResponse,
} from './user.model';
import { UserService } from './user.service';
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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<UserForResponse[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe())
  getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserForResponse> {
    console.log('first')
    return this.userService.getUser(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() dto: CreateUserDto): Promise<UserForResponse> {
    return this.userService.createUser(dto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ): Promise<UserForResponse> {
    return this.userService.updateUser(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
