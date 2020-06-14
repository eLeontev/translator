import { useEffect } from 'react';
import { OrderedMap } from 'immutable';

import {
    apiEndpoint,
    apiDomen,
    notFoundInDictionary,
    wordWasNotTranslated,
} from '../constants/constants';

import {
    ADD,
    DELETE,
    WordPairToDisplay,
    WordPairs,
    WordPair,
    DictionaryInterface,
    TranslateError,
} from '../models/models';
import uniqueId from 'lodash.uniqueid';

export const getErrorMessage = (
    word: string,
    translatedValue: string,
    errorMessage: string
): TranslateError => {
    let updatedErrorMessage = '';
    if (errorMessage) {
        updatedErrorMessage = errorMessage;
    }

    if (word === translatedValue) {
        updatedErrorMessage = wordWasNotTranslated;
    }

    return {
        word,
        key: uniqueId('error-id_'),
        errorMessage: updatedErrorMessage,
    };
};

export const addWordToHints = async (
    dictionaryInterface: DictionaryInterface,
    word: string,
    wordPairs: WordPairs
): Promise<WordPairs | TranslateError> => {
    let updatedWordPairs;

    if (!dictionaryInterface.get(word)) {
        const response = await fetch(`${apiEndpoint}?word=${word}`, {
            headers: {
                Origin: apiDomen,
            },
        });

        const {
            statusCode,
            translatedWord,
            errorMessage,
        } = await response.json();
        const isTranslated = word !== translatedWord;

        if (statusCode === 200 && isTranslated) {
            dictionaryInterface.set(word, translatedWord);
        } else {
            return Promise.reject(
                getErrorMessage(word, translatedWord, errorMessage)
            );
        }
    }

    if (dictionaryInterface.get(word)) {
        updatedWordPairs = wordPairs.set(word, dictionaryInterface.get(word));
    } else {
        return Promise.reject(getErrorMessage(word, '', notFoundInDictionary));
    }

    return updatedWordPairs;
};

export const updateHints = async (
    wordPairs: WordPairs,
    wordPairToDisplay: WordPairToDisplay,
    dictionaryInterface: DictionaryInterface,
    setWordPairs: (wordPairs: WordPairs) => void,
    displayError: (transalteError: TranslateError) => void
): Promise<void> => {
    const { action, wordPair } = wordPairToDisplay;
    const wordWithOnlyLetters = wordPair.word.replace(/\W/g, '');

    let updatedWordPairs;
    if (action === ADD) {
        try {
            updatedWordPairs = await addWordToHints(
                dictionaryInterface,
                wordWithOnlyLetters,
                wordPairs
            );
        } catch (translateError) {
            displayError(translateError);
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
    setWordPairs: (wordPairs: OrderedMap<string, WordPair>) => void,
    displayError: (transalteError: TranslateError) => void
) => {
    useEffect(() => {
        updateHints(
            wordPairs,
            wordPairToDisplay,
            dictionaryInterface,
            setWordPairs,
            displayError
        );
    }, [wordPairToDisplay]);
};
