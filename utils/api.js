import { AsyncStorage } from 'react-native';
import { decks } from './_DATA';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

export async function getDeck(key) {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    console.log(key, JSON.parse(storeResults)[key])
    return JSON.parse(storeResults)[key];
}

export const getDecks = async () => {
  const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  return JSON.parse(results);
}

export const saveDeck = async (key, deck) => {
  await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))

  return 'success';
}

export const saveCard = async (key, card) => {
  console.log(key, card)
  const deck = await getDeck(key);

  await AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY, JSON.stringify({
      [key]: {
        questions: [...deck.questions].concat(card)
      }
    })
  )
}

export const populateDecks = async () => {
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  return decks;
}

export const removeDecksFromStorage = async () => {
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({}));
}

export const removeDeckFromStorage = async (key) => {
  const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  const data = JSON.parse(results);
  data[key] = undefined;
  delete data[key];
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
}