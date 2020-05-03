export const dueToday = (user) => {
  let initialValue = 0;
  let sum =
    user &&
    user.donations &&
    user.donations
      .filter((donation) => donation.oneTime)
      .reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.raisedAmount),
        initialValue
      );
  return sum;
};

export const monthlyPayment = (user) => {
  let initialValue = 0;
  let sum =
    user &&
    user.donations &&
    user.donations
      .filter((donation) => donation.monthly)
      .reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.raisedAmount),
        initialValue
      );
  return sum;
};
