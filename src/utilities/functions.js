// Fisher-Yates shuffle algorithm
export function shuffleCards(arr) {
  const length = arr.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}

export function getRandomNumbers() {
  const arr = [];
  while (arr.length < 12) {
    let num = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(num) === -1) {
      arr.push(num);
      arr.push(num);
    }
  }
  return arr;
}
