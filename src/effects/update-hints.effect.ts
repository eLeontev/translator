import { ADD, DELETE, WordPairToDisplay, WordPairs } from '../models/models';

export const updateHints = (
    wordPairs: WordPairs,
    wordPairToDisplay: WordPairToDisplay,
    setWordPairs: (wordPairs: WordPairs) => void
) => {
    const { action, wordPair } = wordPairToDisplay;
    let updatedWordPairs;
    if (action === ADD) {
        updatedWordPairs = wordPairs.set(wordPair.word, wordPair);
    }

    if (action === DELETE) {
        updatedWordPairs = wordPairs.delete(wordPair.word, wordPair);
    }

    if (updatedWordPairs) {
        setWordPairs(updatedWordPairs);
    }
};
