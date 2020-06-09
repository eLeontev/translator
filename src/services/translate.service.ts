import uniqueid from 'lodash.uniqueid';

import {
    TextWithHints,
    DictionaryInterface,
    ListOfLettersToTranslate,
    Text,
} from '../models/models';

const setLettersToTranslate = (
    distionaryInterface: DictionaryInterface,
    setOfLettersToTrnaslate: Set<string>
) => (listOfLettersToTranslate: ListOfLettersToTranslate, letter: string) => {
    const isAlreadyCandidateToTranslate = setOfLettersToTrnaslate.has(letter);
    const isExists = Boolean(letter);
    const isAlreadyTranslated = distionaryInterface.get(letter);

    if (isAlreadyCandidateToTranslate || !isExists || isAlreadyTranslated) {
        return listOfLettersToTranslate;
    }

    listOfLettersToTranslate.push(letter);
    return listOfLettersToTranslate;
};

export const getTranslatedValues = (
    distionaryInterface: DictionaryInterface
) => async ({ text }: Text): Promise<TextWithHints> => {
    const setOfLettersToTrnaslate = new Set<string>();
    const lettersFromTheText = text.trim().split(' ');

    const listOfLettersToTranslate = lettersFromTheText.reduce(
        setLettersToTranslate(distionaryInterface, setOfLettersToTrnaslate),
        []
    );

    await Promise.all(listOfLettersToTranslate);

    return lettersFromTheText.map((letter: string) => {
        if (!distionaryInterface.get(letter)) {
            distionaryInterface.set(letter, letter);
        }

        return {
            ...distionaryInterface.get(letter),
            key: uniqueid('letter-id_'),
        };
    });
};
