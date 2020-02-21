import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, REMOVE_DECKS, ADD_CARD } from '../actions';

function decks (state = {}, action) {
    const { key } = action;

    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks
            }

        case ADD_DECK :
            const { deck } = action;
            return {
                ...state,
                [key]: deck
            }
        
        case REMOVE_DECK :
            const { [key]: value, ...decks } = state;
            return decks
        
        case REMOVE_DECKS :
            return {}

        case ADD_CARD :
            const { card } = action
            return {
                ...state,
                [key]: {
                    ...state[key],
                    questions: [...state[key].questions].concat(card)
                }
            }

        default :
            return state
    }
}

export default decks