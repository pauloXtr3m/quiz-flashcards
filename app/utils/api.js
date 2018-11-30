import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'QuizFlashCards:decks';

export const fetchDecks = async () => {
	try {
		const value = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
		return formatResults(value);
	} catch (error) {
		// Error retrieving data
	}
};

export function submitEntry ({ entry, key }) {
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[key]: entry
	}));
}

export function removeEntry (key) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results);
			data[key] = undefined;
			delete data[key];
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
		})
}

function formatResults (results) {
	return results === null
		? null
		: JSON.parse(results)
}