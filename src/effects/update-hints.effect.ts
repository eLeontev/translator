import { useEffect } from 'react';
import { OrderedMap } from 'immutable';

import { apiEndpoint, apiDomen } from '../constants/constants';

import {
    ADD,
    DELETE,
    WordPairToDisplay,
    WordPairs,
    WordPair,
    DictionaryInterface,
} from '../models/models';

export const updateHints = async (
    wordPairs: WordPairs,
    wordPairToDisplay: WordPairToDisplay,
    dictionaryInterface: DictionaryInterface,
    setWordPairs: (wordPairs: WordPairs) => void
): Promise<void> => {
    const { action, wordPair } = wordPairToDisplay;
    const wordWithOnlyLetters = wordPair.word.replace(/\W/g, '');

    let updatedWordPairs;
    if (action === ADD) {
        if (!dictionaryInterface.get(wordWithOnlyLetters)) {
            const response = await fetch(
                `${apiEndpoint}?word=${wordWithOnlyLetters}`,
                {
                    headers: {
                        Origin: apiDomen,
                    },
                }
            );

            const { statusCode, translatedWord } = await response.json();

            if (statusCode === 200) {
                dictionaryInterface.set(wordWithOnlyLetters, translatedWord);
            }
        }

        if (dictionaryInterface.get(wordWithOnlyLetters)) {
            updatedWordPairs = wordPairs.set(
                wordWithOnlyLetters,
                dictionaryInterface.get(wordWithOnlyLetters)
            );
        } else {
            // TODO
            console.log('word is not found');
        }
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
    useEffect(() => {
        updateHints(
            wordPairs,
            wordPairToDisplay,
            dictionaryInterface,
            setWordPairs
        );
    }, [wordPairToDisplay]);
};
