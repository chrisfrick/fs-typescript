import { isNotNumber } from './utils';

interface ExerciseValues {
  target: number;
  dailyHours: number[];
}

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  let userArgs = args.slice(2);
  userArgs.forEach((arg) => {
    if (isNotNumber(arg)) {
      throw new Error('Provided values must be numbers');
    }
  });
  let target = Number(userArgs[0]);
  let dailyHours = userArgs.slice(1).map((arg) => Number(arg));
  return {
    target,
    dailyHours,
  };
};

const calculateExercises = (dailyHours: number[], target: number) => {
  let periodLength = dailyHours.length;
  let trainingDays = dailyHours.reduce(
    (trainingDays, dailyHour) =>
      dailyHour > 0 ? (trainingDays += 1) : trainingDays,
    0
  );

  let totalTime = dailyHours.reduce((total, day) => total + day, 0);
  let average = totalTime / periodLength;

  let success = average >= target;

  let rating: number;
  let averageToTargetRatio = average / target;
  if (averageToTargetRatio >= 1) {
    rating = 3;
  } else if (averageToTargetRatio < 1 && averageToTargetRatio >= 0.5) {
    rating = 2;
  } else rating = 1;

  let ratingDescription: string;
  switch (rating) {
    case 1:
      ratingDescription = 'needs improvement to meet your goal';
      break;
    case 2:
      ratingDescription = 'not too bad but could be better';
      break;
    case 3:
      ratingDescription = 'keeep up the good work';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
