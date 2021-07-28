// Fisher-Yates shuffle algorithm
export function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

export function getRandomNumbers() {
  const arr = [];
  while (arr.length < 6) {
    let num = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(num) === -1) {
      arr.push(num);
    }
  }
  return arr;
}
