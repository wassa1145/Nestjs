import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EditUserDto } from './edit-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async edit(@Body() user: EditUserDto, @Req() req) {
    const jwtUserId = req.user.userId;
    return this.usersService.edit(jwtUserId, user);
  }

  @Get('edit-profile/:id')
  @Render('user/edit-profile')
  async renderEditProfile(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const _user = await this.usersService.findById(id);
    if (!_user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Неверный идентификатор пользователя',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return _user;
  }
}
