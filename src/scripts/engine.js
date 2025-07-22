const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score_points'),
    },
    cardSprite: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    playerSides: {
        player1: "player-cards",
        player1Box: document.querySelector('#player-cards'),
        computer: "computer-cards",
        computerBox: document.querySelector('#computer-cards'),
    },

    actions: {
        button: document.getElementById('next-duel'),
    }
};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
}

const pathImages = './src/assets/icons/';
const cardData = [
    {
        id: 0,
        name: 'Blue Eyes White Dragon',
        type: 'Paper',
        img: `${pathImages}dragon.png`,
        WinOf: [1,4],
        LoseOf: [2,5],
    },
    {
        id: 1,
        name: 'Dark Magician',
        type: 'Rock',
        img: `${pathImages}magician.png`,
        WinOf: [2,5],
        LoseOf: [0,3],
    },
    {
        id: 2,
        name: 'Exodia the Forbidden One',
        type: 'Scissors',
        img: `${pathImages}exodia.png`,
        WinOf: [0,3],
        LoseOf: [1,4],
    },
    {
        id: 3,
        name: 'B. Skull Dragon',
        type: 'Paper',
        img: `${pathImages}skullDragon.png`,
        WinOf: [1,4],
        LoseOf: [2,5],
    },
    {
        id: 4,
        name: 'Black Luster Soldier',
        type: 'Rock',
        img: `${pathImages}blackLusterSoldier.png`,
        WinOf: [2,5],
        LoseOf: [0,3],
    },
    {
        id: 5,
        name: 'Flame Swordman',
        type: 'Scissors',
        img: `${pathImages}flameSwordman.png`,
        WinOf: [0,3],
        LoseOf: [1,4],
    }
]


async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(randomIdCard, fieldSide) {
    const cardImage = document.createElement('img');
    cardImage.setAttribute('height', '100px');
    cardImage.setAttribute('data-id', randomIdCard);
    cardImage.setAttribute('src', './src/assets/icons/card-back.png');
    cardImage.classList.add('card');

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener('mouseover', () => {
            drawSelectCard(randomIdCard);
        });

        cardImage.addEventListener('click', () => {
            setCardsField(cardImage.getAttribute('data-id'));
        });
    }

    return cardImage;

}


async function setCardsField(cardId) {
    await removeAllCardsImages();
    let computerCardId = await getRandomCardId();

    await showHiddenCardFieldsImages(true);

    await hiddenCardDetails();

    await drawCardsInField(cardId, computerCardId);

    let duelResult = await checkDuelResult(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResult);
}


async function drawCardsInField(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function showHiddenCardFieldsImages(value) {

    if (value === true) {
        state.fieldCards.player.style.display = 'block';
        state.fieldCards.computer.style.display = 'block';
    } else if (value === false) {
        state.fieldCards.player.style.display = 'none';
        state.fieldCards.computer.style.display = 'none';
    }
}


async function hiddenCardDetails() {
    state.cardSprite.avatar.src = '';
    state.cardSprite.name.innerText = '';
    state.cardSprite.type.innerText = '';
}


async function drawButton(text) {
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = 'block';
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`
}


async function checkDuelResult(playerCardId, computerCardId) {
    let duelResult = 'draw';
    let playerCard = cardData[playerCardId];


    if (playerCard.WinOf.includes(computerCardId)) {
        duelResult = 'win';

        state.score.playerScore++;
    } else if (playerCard.LoseOf.includes(computerCardId)) {
        duelResult = 'lose';

        state.score.computerScore++;
    }


    await playAudio(duelResult);
    return duelResult;
}




async function removeAllCardsImages() {
    let { computerBox, player1Box } = state.playerSides;
    let imgElements = computerBox.querySelectorAll('img');
    imgElements.forEach((img) => img.remove());

    imgElements = player1Box.querySelectorAll('img');
    imgElements.forEach((img) => img.remove());

}



async function drawSelectCard(index) {
    state.cardSprite.avatar.src = cardData[index].img;
    state.cardSprite.name.innerText = cardData[index].name;
    state.cardSprite.type.innerText = `Atribute : ${cardData[index].type}`;

}



async function drawCards(cardNumber, fieldSide) {
    for (let i = 0; i < cardNumber; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);



        document.getElementById(fieldSide).appendChild(cardImage);

    }
}

async function resetDuel() {
    state.cardSprite.avatar.src = '';
    state.actions.button.style.display = 'none';
    state.fieldCards.player.style.display = 'none';
    state.fieldCards.computer.style.display = 'none';

    init();
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    try {
        audio.play();
    } catch (error) {

    }
}

function init() {
    showHiddenCardFieldsImages(false);
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
    const bgm = document.getElementById('bgm');
    bgm.play();
    bgm.volume = 0.4;
}

init();