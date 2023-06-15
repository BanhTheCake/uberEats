import { Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressServices {
  constructor(private addressRespository: AddressRepository) {}
}
