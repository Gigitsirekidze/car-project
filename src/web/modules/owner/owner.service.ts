import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerDto } from './dto';
import { OwnerEntity } from './entities';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
  ) {}

  addOwner(body: OwnerDto): Promise<OwnerEntity> {
    console.log('owner add simulation: ', body);

    return this.ownerRepository.save<OwnerEntity>(body);
  }

  async getAllOwner(): Promise<OwnerEntity[]> {
    console.log('simulating get all owners');

    return this.ownerRepository.find({ relations: ['cars'] });
  }

  deleteOneOwner(username: string): any {
    console.log('delete owner: ', username);

    return this.ownerRepository.delete({ username });
  }

  async getOwnerDetails(username: string): Promise<OwnerEntity> {
    console.log('owner details with id: ', username);

    return this.ownerRepository
      .findOneOrFail({ where: { username }, relations: ['cars'] })
      .catch(() => {
        throw new HttpException(
          { error: `owner ${username} not found` },
          HttpStatus.NOT_FOUND,
        );
      });
  }
}
