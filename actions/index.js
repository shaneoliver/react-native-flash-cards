export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const REMOVE_DECK = 'REMOVE_DECK';
export const REMOVE_DECKS = 'REMOVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function addDeck (key, deck) {
    return {
        type: ADD_DECK,
        key,
        deck,
    }
}

export function addCard (key, card) {
    return {
        type: ADD_CARD,
        key,
        card
    }
}

export function removeDeck (key) {
    return {
        type: REMOVE_DECK,
        key,
    }
}

export function removeDecks () {
    return {
        type: REMOVE_DECKS
    }
}