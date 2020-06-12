import { List } from 'immutable';
import { ChangedWordData, WordPair } from '../models/models';

export const getExistedUniqueId = (
    { isFound, index }: ChangedWordData,
    translatedWordData: { index: number; word: string },
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
            if (translatedWordData.index > index) {
                return textWithHints.get(translatedWordData.index - 1).key;
            }
        }

        // remove new word
        if (wordsFromTheText.size > textWithHints.size) {
            // reuse for all words after changed words with increment
            if (translatedWordData.index > index) {
                return textWithHints.get(translatedWordData.index + 1).key;
            }
        }
    } else {
        return textWithHints.get(translatedWordData.index).key;
    }
};
