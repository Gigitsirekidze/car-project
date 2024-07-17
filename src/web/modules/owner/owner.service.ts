import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerDto } from './dto';
import { DepositRequestDto } from './dto/deposit-request.dto';
import { BalanceEntity, OwnerEntity } from './entities';
import * as crypto from 'crypto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
    @InjectRepository(BalanceEntity)
    private readonly balanceRepository: Repository<BalanceEntity>,
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

  async deposit(depositRequestDto: DepositRequestDto) {
    const ownerFromDb = await this.ownerRepository.findOneOrFail({
      where: {
        username: depositRequestDto.username,
      },
      relations: ['balances'],
    });

    let balanceFromDb = await this.balanceRepository.findOne({
      where: {
        currency: depositRequestDto.currency,
        owner: ownerFromDb,
      },
      relations: ['owner'],
    });

    if (balanceFromDb) {
      balanceFromDb.amount += depositRequestDto.amount;
    } else {
      balanceFromDb = {
        amount: depositRequestDto.amount,
        currency: depositRequestDto.currency,
        owner: ownerFromDb,
        uuid: crypto.randomUUID(),
      };
    }

    return await this.balanceRepository.save(balanceFromDb);
  }
}
