import { AddCarResponseDto } from './add-car-response.dto';

export class OwnCarResponseDto {
  username: string;
  name: string;
  cars: AddCarResponseDto[];
}
