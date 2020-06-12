import { List } from 'immutable';

import {
    ChangedWordData,
    WordPair,
    TranslatedWordData,
} from '../models/models';

export const couldReuseExistedUnieId = (
    textWithHints: List<WordPair>,
    translatedWordData: TranslatedWordData,
    index: number,
    isPositiveOffset: boolean
) =>
    translatedWordData.index > index &&
    textWithHints.get(translatedWordData.index + (isPositiveOffset ? +1 : -1))
        .word === translatedWordData.word;

export const getExistedUniqueId = (
    { isFound, index }: ChangedWordData,
    translatedWordData: TranslatedWordData,
    textWithHints: List<WordPair>,
    wordsFromTheText: List<string>
): string | void => {
    if (isFound) {
        if (translatedWordData.index < index) {
            // reuse existed till changed word
            return textWithHints.get(translatedWordData.index).key;
        }

        // change existed word
        if (wordsFromTheText.size === textWithHints.size) {
            // reuse for all words after changed words
            if (translatedWordData.index > index) {
                return textWithHints.get(translatedWordData.index).key;
            }
        }

        // add new word
        if (wordsFromTheText.size > textWithHints.size) {
            // reuse for all words after changed words with decrement
            if (
                couldReuseExistedUnieId(
                    textWithHints,
                    translatedWordData,
                    index,
                    false
                )
            ) {
                return textWithHints.get(translatedWordData.index - 1).key;
            }
        }

        // remove new word
        if (wordsFromTheText.size < textWithHints.size) {
            // reuse for all words after changed words with increment
            if (
                couldReuseExistedUnieId(
                    textWithHints,
                    translatedWordData,
                    index,
                    true
                )
            ) {
                return textWithHints.get(translatedWordData.index + 1).key;
            }
        }
    } else {
        return textWithHints.get(translatedWordData.index).key;
    }
};
