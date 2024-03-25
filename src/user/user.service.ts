import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UserForResponse,
} from './user.model';
import { PrismaService } from 'src/prisma/prisma.service';

const userWOPassword = {
  id: true,
  login: true,
  version: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<UserForResponse[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getUser(id: string): Promise<UserForResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userWOPassword,
    });
    if (!user) throw new NotFoundException('User was not found');
    return user;
  }

  async createUser(dto: CreateUserDto): Promise<UserForResponse> {
    const user = await this.prisma.user.create({
      data: dto,
      select: userWOPassword,
    });
    return user;
  }

  async updateUser(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<UserForResponse> {
    const user = await this.prisma.user.update({
      where: { id },
      data: dto,
      select: userWOPassword,
    });
    if (!user) throw new NotFoundException('User was not found');
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = this.getUser(id);
    if (user) await this.prisma.user.delete({ where: { id } });
    return;
  }
}
