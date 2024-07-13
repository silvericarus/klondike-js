document.addEventListener("DOMContentLoaded", function() {
    start();
});

function randomizeCard() {
    let suit = ["&hearts;", "&diams;", "&clubs;", "&spades;"];
    let rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let selectedSuit = suit[Math.floor(Math.random() * suit.length)];
    let selectedRank = rank[Math.floor(Math.random() * rank.length)];
    return { suit: selectedSuit, rank: selectedRank };
}

function startGame() {
    let playground = document.getElementById("playground");
    let suit;
    let rank;
    Array.from(playground.children).forEach((element, index) => {
        for (let i = 0; i < (index + 1); i++) {
            let selected = randomizeCard();
            suit = selected.suit;
            rank = selected.rank;
            let card = document.createElement("div");
            card.classList.add("card-poker");

            let cardHeader = document.createElement("div");
            cardHeader.classList.add("card-header");

            let cardRank = document.createElement("div");
            cardRank.classList.add("card-rank");
            cardRank.innerHTML = rank;

            let cardSuit = document.createElement("div");
            cardSuit.classList.add("card-suit");
            if (suit == "&hearts;" || suit == "&diams;") {
                cardSuit.classList.add("card-suit-red");
            } else {
                cardSuit.classList.add("card-suit-black");
            }
            cardSuit.innerHTML = suit;

            cardHeader.appendChild(cardRank);
            cardHeader.appendChild(cardSuit);
            card.appendChild(cardHeader);

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            let cardSuitBig = document.createElement("div");
            if (suit == "&hearts;" || suit == "&diams;") {
                cardSuitBig.classList.add("card-suit-big-red");
            } else {
                cardSuitBig.classList.add("card-suit-big-black");
            }
            cardSuitBig.innerHTML = suit;

            cardBody.appendChild(cardSuitBig);
            card.appendChild(cardBody);

            let cardFooter = document.createElement("div");
            cardFooter.classList.add("card-footer");

            let cardFooterContent = document.createElement("div");
            cardFooterContent.classList.add("card-footer-content");

            let cardRank1 = document.createElement("div");
            cardRank1.classList.add("card-rank");
            cardRank1.innerHTML = rank;
            
            let cardSuit1 = document.createElement("div");
            if (suit == "&hearts;" || suit == "&diams;") {
                cardSuit1.classList.add("card-suit-red");
            } else {
                cardSuit1.classList.add("card-suit-black");
            }
            cardSuit1.innerHTML = suit;

            cardFooterContent.appendChild(cardRank1);
            cardFooterContent.appendChild(cardSuit1);
            cardFooter.appendChild(cardFooterContent);
            card.appendChild(cardFooter);
            
            element.appendChild(card);
        }
    });
}

function start() {
    startGame();
}