const rgbColor = document.getElementById('rgb-color');
const options = document.getElementById('color-options');
const answer = document.getElementById('answer');
const score = document.getElementById('score');

let correctColor = '';

const generateRandomNumber = (min = 0, max = 255) => {
  const [maxNum, minNum] = min > max ? [min, max] : [max, min];
  return Math.floor(Math.random() * (maxNum - minNum) + min);
};

const generateRandomColor = () => {
  const r = generateRandomNumber();
  const g = generateRandomNumber();
  const b = generateRandomNumber();

  return `(${r}, ${g}, ${b})`;
};

const setGameColor = () => {
  rgbColor.innerText = correctColor;
};

const shuffle = (array) => {
  for (let index = 0; index < 100; index += 1) {
    const from = generateRandomNumber(0, array.length);
    const to = generateRandomNumber(0, array.length);
    array.splice(to, 0, array.splice(from, 1)[0]);
  }
};

const createOption = (color) => {
  const option = document.createElement('div');
  option.classList.add('ball');
  option.addEventListener('click', checkGuess);
  option.style.backgroundColor = `rgb${color}`;
  return option;
};

const generateColorOptions = (quantity) => {
  const optArray = [];
  optArray.push(createOption(correctColor));

  for (let index = 0; index < quantity - 1; index += 1) {
    optArray.push(createOption(generateRandomColor()));
  }

  shuffle(optArray);

  for (let index = 0; index < quantity; index += 1) {
    options.appendChild(optArray[index]);
  }
};

const resetGame = () => {
  answer.innerHTML = '<span>Escolha uma cor!</span>';
  if (options.children.length) {
    Array.from(options.children).forEach((ball) => ball.remove());
  }
  correctColor = generateRandomColor();
  setGameColor();
  generateColorOptions(6);
};

const setScore = (delta) => {
  let scrValue = parseInt(score.innerText, 10);
  scrValue += delta;
  score.innerText = scrValue;
};

const checkGuess = (event) => {
  const guess = event.target;
  if (guess.style.backgroundColor !== `rgb${correctColor}`) {
    answer.innerHTML = '<span class="error">Errou! Tente novamente!</span>';
    setScore(-1);
  } else {
    answer.innerHTML = '<span class="success">Acertou!</span>';
    setScore(3);
    setTimeout(() => resetGame(), 3000);
  }
};

window.onload = () => resetGame();

document.getElementById('reset-game').addEventListener('click', resetGame);
