import { List } from 'immutable';
import uniqueId from 'lodash.uniqueid';

import { findChangedWordIndex } from './find-changed-word';
import { getExistedUniqueId } from './reuse-existed-unique-id';

import { WordPairs, Text, WordPair } from '../models/models';

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

export const removeEmptyElements = (word: string) => word;

export const getTextWithHints = (
    { text, previousText }: Text,
    textWithHints: List<WordPair>
): WordPairs => {
    const wordsFromTheText = text.trim().length
        ? List(text.trim().split(' ')).filter(removeEmptyElements)
        : List();

    const isSingleSymbolChanged = isOnlySingleSymbolChanged(
        textWithHints,
        wordsFromTheText
    );
    const changedWordData = findChangedWordIndex(
        previousText.split(' ').filter(removeEmptyElements),
        wordsFromTheText.toArray(),
        isSingleSymbolChanged
    );

    return wordsFromTheText.map((word: string, index: number) => ({
        word,
        key: isSingleSymbolChanged
            ? getExistedUniqueId(
                  changedWordData,
                  { word, index },
                  textWithHints,
                  wordsFromTheText
              ) || uniqueId('word-id')
            : uniqueId('word-id'),
    }));
};
