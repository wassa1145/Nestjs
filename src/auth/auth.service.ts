import { Injectable } from '@nestjs/common';
import { compare } from '../utils/crypto';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any | null> {
    const _user = await this.usersService.findByEmail(email);
    if (_user && (await compare(pass, _user.password))) {
      const { password, ...result } = _user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string) {
    return this.jwtService.verify(token);
  }
}
