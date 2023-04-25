export function getSum(data, field) {
  return (data.reduce((accumulator, currentValue) => accumulator + Number(currentValue[field]), 0));
}

export function getPercentage(data, field1, field2) {
  const field1Sum = getSum(data, field1);
  const field2Sum = getSum(data, field2);

  return (
    (field1Sum / (field1Sum + field2Sum)) * 100
  );
}
