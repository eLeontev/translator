import uniqueId from 'lodash.uniqueid';

import {
    WordPairs,
    DictionaryInterface,
    ListOfWordsToTranslate,
    Text,
} from '../models/models';

const setWordsToTranslate = (
    distionaryInterface: DictionaryInterface,
    setOfWordsToTrnaslate: Set<string>
) => (listOfWordsToTranslate: ListOfWordsToTranslate, word: string) => {
    const isAlreadyCandidateToTranslate = setOfWordsToTrnaslate.has(word);
    const isExists = Boolean(word);
    const isAlreadyTranslated = distionaryInterface.get(word);

    if (isAlreadyCandidateToTranslate || !isExists || isAlreadyTranslated) {
        return listOfWordsToTranslate;
    }

    setOfWordsToTrnaslate.add(word);
    listOfWordsToTranslate.push(word);
    return listOfWordsToTranslate;
};

export const getTranslatedValues = (
    distionaryInterface: DictionaryInterface
) => async ({ text }: Text): Promise<WordPairs> => {
    const setOfWordsToTrnaslate = new Set<string>();
    const wordsFromTheText = text.trim().split(' ');

    const listOfWordsToTranslate = wordsFromTheText.reduce(
        setWordsToTranslate(distionaryInterface, setOfWordsToTrnaslate),
        []
    );

    await Promise.all(listOfWordsToTranslate);

    return wordsFromTheText.map((word: string) => {
        if (!distionaryInterface.get(word)) {
            distionaryInterface.set(word, word);
        }

        return {
            ...distionaryInterface.get(word),
            key: uniqueId('word-id'),
        };
    });
};
