import { List } from 'immutable';
import uniqueId from 'lodash.uniqueid';

import { findChangedWordIndex } from './find-changed-word';
import { getExistedUniqueId } from './reuse-existed-unique-id';

import {
    WordPairs,
    DictionaryInterface,
    ListOfWordsToTranslate,
    Text,
    WordPair,
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

export const isOnlySingleSymbolChanged = (
    textWithHints: List<WordPair>,
    wordsFromTheText: List<string>
) =>
    Math.abs(
        textWithHints.reduce(
            (str: string, { word }: WordPair) => `${str}${word}`,
            ''
        ).length -
            wordsFromTheText.reduce(
                (str: string, word: string) => `${str}${word}`,
                ''
            ).length
    ) <= 1;

export const getTranslatedValues = (
    distionaryInterface: DictionaryInterface
) => async (
    { text, previousText }: Text,
    textWithHints: List<WordPair>
): Promise<WordPairs> => {
    const setOfWordsToTrnaslate = new Set<string>();
    const wordsFromTheText = text.trim().length
        ? List(text.trim().split(' ')).filter((word: string) => word)
        : List();

    const isSingleSymbolChanged = isOnlySingleSymbolChanged(
        textWithHints,
        wordsFromTheText
    );
    const changedWordData = findChangedWordIndex(
        previousText,
        wordsFromTheText.toArray(),
        isSingleSymbolChanged
    );

    const listOfWordsToTranslate = isSingleSymbolChanged
        ? changedWordData.wordsToTranslate
        : wordsFromTheText.reduce(
              setWordsToTranslate(distionaryInterface, setOfWordsToTrnaslate),
              []
          );

    await Promise.all(listOfWordsToTranslate);

    return wordsFromTheText.map((word: string, index: number) => {
        if (!distionaryInterface.get(word)) {
            distionaryInterface.set(word, word);
        }

        return {
            ...distionaryInterface.get(word),
            key: isSingleSymbolChanged
                ? getExistedUniqueId(
                      changedWordData,
                      { word, index },
                      textWithHints,
                      wordsFromTheText
                  ) || uniqueId('word-id')
                : uniqueId('word-id'),
        };
    });
};
