import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';

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

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
