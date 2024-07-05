import { AuthGuard } from '@common/modules/auth/auth.guard';
import {
  Body,
  Controller,
  Get, NotFoundException,
  Param,
  ParseIntPipe,
  Post, Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as path from 'path';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './dtos';
import { extname } from 'path';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
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
  register(
    @Body() registerDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.userService.register(registerDto);
  }

  @Post('/upload')
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
  async uploadFile(
    @Param('username') username: string,
    @UploadedFile() photo: any,
  ) {
    return {
      originalname: photo.originalname,
      filename: photo.filename,
      path: photo.path,
    };
  }

  @Get('/:username')
  async getPhoto(@Param('username') username: string, @Res() res: Response) {
    const fileExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    for (const ext of fileExtensions) {
      const filePath = path.join(photosDir, `${username}${ext}`);
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
    }
    throw new NotFoundException('Photo not found');
  }
}
