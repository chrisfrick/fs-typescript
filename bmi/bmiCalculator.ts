const calculateBmi = (heightCm: number, weightKg: number): string => {
  let bmi = weightKg / (heightCm / 100) ** 2;
  if (bmi <= 18.5) {
    return `BMI: ${bmi} (underweight)`;
  } else if (bmi > 18.5 && bmi < 25) {
    return `BMI: ${bmi} (healthy weight)`;
  } else if (bmi >= 25 && bmi < 30) {
    return `BMI: ${bmi} (overweight)`;
  } else {
    return `BMI: ${bmi} (obesity)`;
  }
};

console.log(calculateBmi(180, 74));
