import { ButtonConstructorParams } from '../Button/contract';

export enum State {
  OFF = 0,
  ON = 1
}

export interface SwitchConstructorParams extends Partial<ButtonConstructorParams> {
  state?: State;
  label?: string;
}
