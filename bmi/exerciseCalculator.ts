interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
