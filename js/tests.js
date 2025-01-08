import * as decks from "./decks.js";

function testDuplicates() {
    let duplicates = [];
    let seenCards = new Set();

    decks.board.forEach(card => {
        let cardId = `${card.rank}${card.suit}`;
        if (seenCards.has(cardId)) {
            duplicates.push(card);
        } else {
            seenCards.add(cardId);
        }
    });

    if (duplicates.length > 0) {
        console.table(duplicates);
        console.error("KO: Se encontraron cartas duplicadas.");
    } else {
        console.table(seenCards);
        console.info("OK: No se encontraron duplicados.");
    }
}

function runTests() {
    testDuplicates();
}

export { testDuplicates, runTests };
