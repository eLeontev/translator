import { useEffect } from 'react';
import { OrderedMap } from 'immutable';

import {
    ADD,
    DELETE,
    WordPairToDisplay,
    WordPairs,
    WordPair,
} from '../models/models';

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

export const useUpdateHints = (
    wordPairs: WordPairs,
    setWordPairs: (wordPairs: OrderedMap<string, WordPair>) => void,
    wordPairToDisplay: WordPairToDisplay
) => {
    useEffect(() => updateHints(wordPairs, wordPairToDisplay, setWordPairs), [
        wordPairToDisplay,
    ]);
};
