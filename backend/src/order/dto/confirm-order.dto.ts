import { IsNumberString } from 'class-validator';

export class ConfirmOrderDto {
  @IsNumberString()
  sessionId!: string;
}
