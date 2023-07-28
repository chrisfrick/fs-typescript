import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';

app.get('/hello', (_req, res) => {
  res.send('Hello!');
});

app.get('/bmi/', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({
      error: 'height or weight missing',
    });
  }

  let height = req.query.height;
  let weight = req.query.weight;

  if (isNotNumber(height) || isNotNumber(weight)) {
    return res.status(400).json({
      error: 'malformatted paramaters',
    });
  }

  let bmi = calculateBmi(Number(height), Number(weight));

  return res.json({
    weight,
    height,
    bmi,
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
