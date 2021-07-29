import { shuffleCards, getRandomNumbers } from "../../src/utilities/functions"

it('shuffle cards', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const arr2 = shuffleCards([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  let isSameOrder = true;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr2[i]) {
      isSameOrder = false;
      break;
    }
  }
  expect(isSameOrder).toBe(false);
});

it('get random numbers between 1 - 100', () => {
  const arr = getRandomNumbers();
  let isInRange = true;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 1 || arr[i] > 100) {
      isInRange = false;
      break;
    }
  }
  expect(isInRange).toBe(true);
})
