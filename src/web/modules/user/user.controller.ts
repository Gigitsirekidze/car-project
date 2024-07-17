import { AuthGuard } from '@common/modules/auth/auth.guard';
import {
  Body,
  Controller,
  Post, UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { extname } from 'path';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './dtos';
import { UserService } from './user.service';

const photosDir = path.join(__dirname, '..', '..', '..', '..', '..', 'photos');

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.userService.login(loginDto);
  }

  @Post('/register')
  register(
    @Body() registerDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.userService.register(registerDto);
  }

  @Post('/upload-photo')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: (req, photo, cb) => {
          fs.mkdirSync(photosDir, { recursive: true });
          cb(null, photosDir);
        },
        filename: (req, photo, cb) => {
          const ext = extname(photo.originalname);

          cb(null, `${req.user.username}${ext}`);
        },
      }),
    }),
  )
  uploadPhoto(@UploadedFile() photo: any) {
    return {
      originalname: photo.originalname,
      filename: photo.filename,
      path: path.join(photosDir, photo.filename),
    };
  }
}
