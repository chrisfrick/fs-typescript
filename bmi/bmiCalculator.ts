import { isNotNumber } from './utils';

interface BmiValues {
  heightCm: number;
  weightKg: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      heightCm: Number(args[2]),
      weightKg: Number(args[3]),
    };
  } else {
    throw new Error('Provided values are not numbers!');
  }
};

export const calculateBmi = (heightCm: number, weightKg: number): string => {
  const bmi = weightKg / (heightCm / 100) ** 2;
  if (bmi <= 18.5) {
    return 'underweight';
  } else if (bmi > 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight)';
  } else {
    return 'Obese';
  }
};

try {
  const { heightCm, weightKg } = parseArguments(process.argv);
  console.log(calculateBmi(heightCm, weightKg));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
