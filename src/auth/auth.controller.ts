import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto, SignInDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const generatedId = await this.authService.register(dto);
    return { id: generatedId };
  }

  @Post('signin')
  async singIn(@Body() dto: SignInDto) {
    const res = await this.authService.singIn(dto);
    return res;
  }
}
