import { AsyncStorage } from 'react-native';

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


export function addDeck ({ entry, key }) {
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[key]: entry
	}));
}

export function increaseCardsNumber(key) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[key].cardsNumber = data[key].cardsNumber + 1;
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function deleteDeck (key) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results);
			data[key] = undefined;
			delete data[key];
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
		})
}

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