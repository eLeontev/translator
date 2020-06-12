import { useEffect } from 'react';
import { OrderedMap } from 'immutable';

import {
    ADD,
    DELETE,
    WordPairToDisplay,
    WordPairs,
    WordPair,
    DictionaryInterface,
} from '../models/models';

export const updateHints = (
    wordPairs: WordPairs,
    wordPairToDisplay: WordPairToDisplay,
    dictionaryInterface: DictionaryInterface,
    setWordPairs: (wordPairs: WordPairs) => void
) => {
    const { action, wordPair } = wordPairToDisplay;
    const wordWithOnlyLetters = wordPair.word.replace(/\W/g, '');

    let updatedWordPairs;
    if (action === ADD) {
        if (!dictionaryInterface.get(wordWithOnlyLetters)) {
            const translatedValue = wordWithOnlyLetters; // TODO
            dictionaryInterface.set(wordWithOnlyLetters, translatedValue);
        }

        updatedWordPairs = wordPairs.set(
            wordWithOnlyLetters,
            dictionaryInterface.get(wordWithOnlyLetters)
        );
    }

    if (action === DELETE) {
        updatedWordPairs = wordPairs.delete(wordWithOnlyLetters, wordPair);
    }

    if (updatedWordPairs) {
        setWordPairs(updatedWordPairs);
    }
};

export const useUpdateHints = (
    wordPairs: WordPairs,
    wordPairToDisplay: WordPairToDisplay,
    dictionaryInterface: DictionaryInterface,
    setWordPairs: (wordPairs: OrderedMap<string, WordPair>) => void
) => {
    useEffect(
        () =>
            updateHints(
                wordPairs,
                wordPairToDisplay,
                dictionaryInterface,
                setWordPairs
            ),
        [wordPairToDisplay]
    );
};
