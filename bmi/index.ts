import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber } from './utils';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello!');
});

app.get('/bmi/', (req, res) => {
  const { height, weight } = req.query;

  if (!height || isNotNumber(height)) {
    return res.status(400).json({
      error: 'height or weight missing',
    });
  }

  if (!weight || isNotNumber(weight)) {
    return res.status(400).json({
      error: 'malformatted paramaters',
    });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  return res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // validate that paramaters exist
  if (!daily_exercises || !target ) {
    return res.status(400).json({
      error: "paramters missing"
    });
  }

  // validate type of parameters
  if ( !Array.isArray(daily_exercises) || daily_exercises.some(elem => isNaN(Number(elem))) ) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }
  if ( isNotNumber(target) ) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  const result = calculateExercises(daily_exercises.map(elem => Number(elem)), Number(target));

  return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
