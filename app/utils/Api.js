import { AsyncStorage } from 'react-native';
import * as MapUtils from "./MapUtils";

const DECKS_STORAGE_KEY = 'QuizFlashCards:decks';
const CARDS_STORAGE_KEY = 'QuizFlashCards:cards';

export const fetchDecks = async () => {
	try {
		const value = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
		return formatResults(value);
	} catch (error) {
		// Error retrieving data
	}
};

export function deleteDeck (key) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[key] = undefined;
            delete data[key];
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function addDeck ({ entry, key }) {
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[key]: entry
	}));
}

export function updateBestScore({ key, score }){
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);

            const lastBestScore = data[key].bestScore
                ? data[key].bestScore
                : 0;

            data[key].bestScore = lastBestScore < score
                ? score
                : lastBestScore;

            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function increaseCardsNumber(key) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[key].cardsNumber = data[key].cardsNumber + 1;
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export const fetchCards = async (deckKey) => {
    try {
        const value = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
        const cards = formatResults(value);
        return filterCards(deckKey, cards);
    } catch (error) {
        // Error retrieving data
    }
};

export function addCard ({ entry, key }) {
    return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }));
}

function formatResults (results) {
	return results === null
		? null
		: JSON.parse(results)
}

function filterCards(deckKey, cards){
	const cardsArray = MapUtils.toArray(cards);

	return cardsArray.filter(card => card.deckKey === deckKey);
}