document.addEventListener('DOMContentLoaded', () => {

    const cardArray = [
        { name: 'clip1', 
          img: 'assets/clip1.png' },

        { name: 'clip2', 
          img: 'assets/clip2.png' },

        { name: 'clip3', 
          img: 'assets/clip3.png' },
        
        { name: 'clip4', 
          img: 'assets/clip4.png' },

        { name: 'clip5', 
          img: 'assets/clip5.png' },

        { name: 'clip6', 
          img: 'assets/clip6.png' },

        { name: 'clip1', 
          img: 'assets/clip1.png' },

        { name: 'clip2', 
          img: 'assets/clip2.png' },

        { name: 'clip3', 
          img: 'assets/clip3.png' },

        { name: 'clip4', 
          img: 'assets/clip4.png' },

        { name: 'clip5', 
          img: 'assets/clip5.png' },

        { name: 'clip6', 
          img: 'assets/clip6.png' }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const board = document.querySelector('.board');
    const result = document.querySelector('#score');
    const placeholder = 'assets/question-clip.png';
    const blank = 'happy-clip.png';

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsMatched = [];

    function createBoard() {
        board.innerHTML = "";

        cardArray.forEach((item, index) => {
            const card = document.createElement('img');
            card.setAttribute('src', placeholder);
            card.setAttribute('data-id', index);
            card.classList.add('card');
            card.addEventListener('click', flipCard);
            board.appendChild(card);
        });
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');

        if (cardsChosenId.includes(cardId)) return;

        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);

        this.setAttribute('src', cardArray[cardId].img);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.board img');
        const [id1, id2] = cardsChosenId;

        if (cardsChosen[0] === cardsChosen[1]) {
            cards[id1].setAttribute('src', blank);
            cards[id2].setAttribute('src', blank);

            cards[id1].removeEventListener('click', flipCard);
            cards[id2].removeEventListener('click', flipCard);

            cardsMatched.push(cardsChosen);
            const audio = document.getElementById('assets/right-sound');
            if (audio) {
                audio.playbackRate = 1.5;
                audio.volume = 1;
                audio.play();
            }

        } else {
            cards[id1].setAttribute('src', placeholder);
            cards[id2].setAttribute('src', placeholder);

            const audio = document.getElementById('assets/mistake-sound');
            if (audio) {
                audio.playbackRate = 1.7;
                audio.volume = 1;
                audio.play();
            }
        }

        // reset selección
        cardsChosen = [];
        cardsChosenId = [];

        // actualizar score
        result.textContent = cardsMatched.length;

        // ganar
        if (cardsMatched.length === cardArray.length / 2) {
            const nextBtn = document.getElementById("next-level");
            nextBtn.style.display = "block";
            result.textContent= "Congrats, you can continue";
            
        }
    }

    createBoard();
    function nextLevel() {
    window.location.href = "house.html";
}
});
