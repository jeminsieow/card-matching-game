import { shuffleCards, getRandomNumbers } from "../../src/utilities/functions"

test('shuffle cards', () => {
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

test('get random numbers between 1 - 100', () => {
  const arr = getRandomNumbers();
  let isInRange = true;
  let isAllDifferent = true;
  const set = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (set.has(arr[i])) {
      isAllDifferent = false;
    } else {
      set.add(arr[i]);
    }

    if (arr[i] < 1 || arr[i] > 100) {
      isInRange = false;
      break;
    }
  }
  expect(isInRange).toBe(true);
  expect(isAllDifferent).toBe(true);
})