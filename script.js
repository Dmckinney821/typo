
const word = document.getElementById('word');
const text= document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySetting = document.getElementById('difficulty');

// list of arbitraty words
const words = [
    'sigh',
    'test',
    'burn',
    'party',
    'man',
    'multi',
    'question',
    'quince',
    'hops',
    'hominy',
    'beer',
    'dont',
    'sarah',
    'stone',
    'apple',
    'textkernel',
    'macys',
    'mcdonalds',
    'macaroni',
    'miami',
    'mvp',
    'beefs'
];

// initialize words and score and time
let randomWord;

let score = 0;

let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySetting.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// focus to text when starting
text.focus();

// start the countdown
const timeInterval = setInterval(updateTime, 1000);

// generating rnaodom words
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
  }
  

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
  }

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0) {
        clearInterval(timeInterval);
        // end the game
        gameOver();
    }
}

function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time don run out</h1>
        <p>Your final score is ${score}</p>
        <button onclick='location.reload()'>Reload</button>
    `;
    endgameEl.style.display = 'flex';
}

addWordToDOM()

text.addEventListener('input', e => {
    const insertedText = e.target.value;
  
    if (insertedText === randomWord) {
      addWordToDOM()
      updateScore()
      e.target.value = '';

      if(difficulty === 'hard') {
          time += 1;
      } else if (difficulty === 'medium') {
          time += 3;
      } else {
          time += 5
      }

      updateTime()
    }
})

// difficulty settings
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty)
})