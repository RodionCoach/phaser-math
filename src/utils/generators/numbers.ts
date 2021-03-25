import { SIGNS } from "../constants";
import { signGenerator } from "./signs";

interface Example {
  number1: number;
  sign: string;
  number2: number;
  answer: number;
}

const division = (sign: string): Example => {
  const example = multiplication(SIGNS[2], 4);
  return {
    number1: example.answer,
    sign: sign,
    number2: example.number1,
    answer: example.answer / example.number1,
  };
};
const multiplication = (sign: string, max: number): Example => {
  const number1 = Phaser.Math.Between(1, 9);
  const number2 = number1 > max ? Phaser.Math.Between(1, 9 - (number1 - max)) : Phaser.Math.Between(1, 9);
  return {
    number1: number1,
    sign: sign,
    number2: number2,
    answer: number1 * number2,
  };
};
const subtraction = (sign: string): Example => {
  const number1 = Phaser.Math.Between(1, 25);
  const number2 = Phaser.Math.Between(1, number1);
  return {
    number1: number1,
    sign: sign,
    number2: number2,
    answer: number1 - number2,
  };
};
const addition = (sign: string): Example => {
  const number1 = Phaser.Math.Between(1, 25);
  const number2 = Phaser.Math.Between(1, 9);
  return {
    number1: number1,
    sign: sign,
    number2: number2,
    answer: number1 + number2,
  };
};

export const exampleGenerator = (): Example => {
  const sign = signGenerator(SIGNS);
  switch (sign) {
    case SIGNS[0]:
      return addition(sign);
    case SIGNS[1]:
      return subtraction(sign);
    case SIGNS[2]:
      return multiplication(sign, 9);
    case SIGNS[3]:
      return division(sign);
    default:
      return addition(SIGNS[0]);
  }
};
