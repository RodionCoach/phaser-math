import { SIGNS } from "../constants";

const division = sign => {
  const example = multiplication(SIGNS[2], 4);
  return {
    id: 40,
    number1: example.answer,
    sign: sign,
    number2: example.number1,
    answer: example.answer / example.number1,
  };
};
const multiplication = (sign, max) => {
  const number1 = Phaser.Math.Between(1, 9);
  const number2 = number1 > max ? Phaser.Math.Between(1, 9 - (number1 - max)) : Phaser.Math.Between(1, 9);
  return {
    id: 40,
    number1: number1,
    sign: sign,
    number2: number2,
    answer: number1 * number2,
  };
};
const subtraction = sign => {
  const number1 = Phaser.Math.Between(1, 25);
  const number2 = Phaser.Math.Between(1, number1);
  return {
    id: 40,
    number1: number1,
    sign: sign,
    number2: number2,
    answer: number1 - number2,
  };
};
const addition = sign => {
  const number1 = Phaser.Math.Between(1, 25);
  const number2 = Phaser.Math.Between(1, 9);
  return {
    id: 40,
    number1: number1,
    sign: sign,
    number2: number2,
    answer: number1 + number2,
  };
};

export const exampleGenerator = sign => {
  switch (sign) {
    case SIGNS[0]:
      return addition(sign);
      break;

    case SIGNS[1]:
      return subtraction(sign);
      break;

    case SIGNS[2]:
      return multiplication(sign, 9);
      break;

    case SIGNS[3]:
      return division(sign);
      break;

    default:
      break;
  }
};
