import * as decks from "./decks.js";
import * as tests from "./tests.js";

document.addEventListener("DOMContentLoaded", function () {
    start();
});

let deck = decks.deck;

function isOppositeColor(suit1, suit2) {
    const redSuits = ["&hearts;", "&diams;"];
    const blackSuits = ["&clubs;", "&spades;"];

    return (
        (redSuits.includes(suit1) && blackSuits.includes(suit2)) ||
        (blackSuits.includes(suit1) && redSuits.includes(suit2))
    );
}

function isCorrectNumber(number1, number2) {
    const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    return numbers.indexOf(number1) - 1 == numbers.indexOf(number2);
}

window.drop = drop;
window.allowDrop = allowDrop;
window.drag = drag;

function drop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let data = ev.dataTransfer.getData("text");
    let draggedElement = document.getElementById(data);
    let target = ev.target;

    while (target && !target.classList.contains('stack-cell') && !target.classList.contains('foundation')) {
        target = target.parentElement;
    }
    if (target && (target.classList.contains('stack-cell') || target.classList.contains('foundation'))) {
        if (target.classList.contains('stack-cell')) {
            let lastChild = target.lastChild;
            if (lastChild.classList !== undefined && lastChild.classList.contains('card-poker')) {
                let lastChildNumber = /(\d+|A|J|Q|K)/.exec(lastChild.id)[0];
                let lastChildSuit = /[^AJQK\d]+/.exec(lastChild.id)[0];
                let draggedElementNumber = /(\d+|A|J|Q|K)/.exec(draggedElement.id)[0];
                let draggedElementSuit = /[^AJQK\d]+/.exec(draggedElement.id)[0];
                if (isCorrectNumber(lastChildNumber, draggedElementNumber) && isOppositeColor(lastChildSuit, draggedElementSuit)) {
                    let lastChildZIndex = parseInt(lastChild.style.zIndex) || 0;
                    let lastChildTop = parseInt(lastChild.style.top) || 0;
                    draggedElement.style.zIndex = `${lastChildZIndex + 1}`;
                    draggedElement.style.top = `${-1 * (Math.abs(lastChildTop - 175))}px`;
                    target.appendChild(draggedElement);
                }
            }
        } else if (target.classList.contains('foundation')) {
            let lastChild = target.lastChild;
            if (lastChild.classList !== undefined && lastChild.classList.contains('card-poker')) {
                let lastChildZIndex = parseInt(lastChild.style.zIndex);
                draggedElement.style.zIndex = `${lastChildZIndex + 1}`;
                draggedElement.style.top = "0px";
                target.appendChild(draggedElement);
            } else {
                draggedElement.style.zIndex = "0";
                draggedElement.style.top = "0px";
                target.appendChild(draggedElement);
            }
        }
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    let draggedElement = document.getElementById(ev.target.id);
    let lastChild = draggedElement.parentElement.lastChild;
    if (lastChild === draggedElement) {
        ev.dataTransfer.setData("text", ev.target.id);
    } else {
        ev.dataTransfer.setData("text", lastChild.id);
    }
}

function randomizeCard() {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let selectedCard = deck[randomIndex];
    decks.deck.splice(randomIndex, 1);
    return selectedCard;
}

function startGame() {
    let playground = document.getElementById("playground");
    let suit;
    let rank;
    let id;
    Array.from(playground.children).forEach((element, index) => {
        for (let i = 0; i < (index + 1); i++) {
            do {
                let selected = randomizeCard();
                suit = selected.suit;
                rank = selected.rank;
                id = `${rank}${suit}`;
                if (!decks.board.some(card => card.rank === rank && card.suit === suit)) {
                    decks.board.push({ rank: rank, suit: suit});
                    deck = deck.filter(card => card.rank !== rank || card.suit !== suit);
                }
            } while (decks.board.includes(id));
            if (i != index) {
                let cardBack = document.createElement("div");
                cardBack.classList.add("card-back");
                cardBack.setAttribute("id", id);
                let cardBackPattern = document.createElement("div");
                cardBackPattern.classList.add("card-back-pattern");
                cardBack.appendChild(cardBackPattern);
                cardBack.style.zIndex = `${i}`;
                cardBack.style.top = `${-175 * i}px`;
                element.appendChild(cardBack);
            } else {
                let card = document.createElement("div");
                card.classList.add("card-poker");
                card.setAttribute("id", id);
                card.setAttribute("draggable", "true");
                card.setAttribute("ondragstart", "drag(event)");
                card.setAttribute("ondrop", "drop(event)");
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
                card.style.zIndex = `${i}`;
                card.style.top = `${-175 * i}px`;
                element.appendChild(card);
            }
        }
    });
}

function start() {
    document.getElementById("deck").addEventListener("click", function () {
        //TODO Implement deck click event
        alert("Deck clicked");
    });
    startGame();
    //tests.runTests();
}
