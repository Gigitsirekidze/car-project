import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
// import { User } from './user.entity';
// import { Owner } from './owner.entity';
// import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findOne(username: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ username });
  }

  // async register(createUserDto: CreateUserDto): Promise<User> {
  //   const user = this.userRepository.create(createUserDto);
  //   user.password = await bcrypt.hash(user.password, 10); // Hash password
  //   await this.userRepository.save(user);
  //
  //   if (user.role === 'User') {
  //     const owner = new Owner();
  //     owner.user = user;
  //     await this.ownerRepository.save(owner);
  //   }
  //
  //   return user;
  // }
  async create(registerDto: any): Promise<UserEntity> {
    return this.userRepository.save(registerDto);
  }
}
