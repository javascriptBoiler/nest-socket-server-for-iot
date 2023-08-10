
import { IsNotEmpty } from 'class-validator';

export class CreateMeasureeDto{
  @IsNotEmpty()
  readonly deviceId: string;
  @IsNotEmpty()
  readonly measure: string;
  @IsNotEmpty()
  readonly value: string;
}