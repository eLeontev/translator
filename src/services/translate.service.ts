import uniqueid from 'lodash.uniqueid';

import {
    TextWithHints,
    DictionaryInterface,
    ListOfWordsToTranslate,
    Text,
} from '../models/models';

const setWordsToTranslate = (
    distionaryInterface: DictionaryInterface,
    setOfWordsToTrnaslate: Set<string>
) => (listOfWordsToTranslate: ListOfWordsToTranslate, letter: string) => {
    const isAlreadyCandidateToTranslate = setOfWordsToTrnaslate.has(letter);
    const isExists = Boolean(letter);
    const isAlreadyTranslated = distionaryInterface.get(letter);

    if (isAlreadyCandidateToTranslate || !isExists || isAlreadyTranslated) {
        return listOfWordsToTranslate;
    }

    listOfWordsToTranslate.push(letter);
    return listOfWordsToTranslate;
};

export const getTranslatedValues = (
    distionaryInterface: DictionaryInterface
) => async ({ text }: Text): Promise<TextWithHints> => {
    const setOfWordsToTrnaslate = new Set<string>();
    const wordsFromTheText = text.trim().split(' ');

    const listOfWordsToTranslate = wordsFromTheText.reduce(
        setWordsToTranslate(distionaryInterface, setOfWordsToTrnaslate),
        []
    );

    await Promise.all(listOfWordsToTranslate);

    return wordsFromTheText.map((letter: string) => {
        if (!distionaryInterface.get(letter)) {
            distionaryInterface.set(letter, letter);
        }

        return {
            ...distionaryInterface.get(letter),
            key: uniqueid('letter-id_'),
        };
    });
};
