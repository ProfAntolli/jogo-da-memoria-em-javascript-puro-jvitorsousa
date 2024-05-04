const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer= document.querySelector ('.timer')

const characters = [
    'jiraya',
    'kankuro',
    'kurenai',
    'naruto',
    'rock-lee',
    'sakura',
    'sasuke',
    'shikamaru',
    'tenten',
];

let firstCard = null;
let secondCard = null;

const checkEndGame = () =>{

    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length === 18){
        alert('PARABENS,VOCE CONSEGUIU!');
    }

}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card') || secondCard !== null) {
        return;
    }

    if (firstCard === null) {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
        checkEndGame(); // Adiciona esta linha para verificar o fim do jogo após cada virada de carta
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.classList.add('disabled-card');
        secondCard.classList.add('disabled-card');
        firstCard = null;
        secondCard = null;
        
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = null;
            secondCard = null;
        }, 500);
    }
}


const duplicatedCharacters = [...characters, ...characters];

const createCard = (character) => {
    const card = document.createElement('div');
    card.className = 'card'; 

    const front = document.createElement('div');
    front.className = 'face front'; 

    const back = document.createElement('div');
    back.className = 'face back'; 

    front.style.backgroundImage = `url('../images/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}

const loadGame = () => {
    duplicatedCharacters.sort(() => Math.random() - 0.9);

    duplicatedCharacters.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () =>{
   
   setInterval(() => {

    const currentTime= +timer.innerHTML;
    timer.innerHTML = currentTime +1

   }, 1000);

}

window.onload = () =>{
    spanPlayer.innerHTML =localStorage.getItem('player');
    startTimer();
    loadGame();
  
}

