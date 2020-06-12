import uniqueId from 'lodash.uniqueid';

import { Dictionary, DictionaryInterface, WordPair } from '../models/models';

const dictionary: Dictionary = {};

export const dictionaryInterface: DictionaryInterface = {
    set(word: string, translatedValue: string): void {
        dictionary[word] = {
            word,
            translatedValue,
            key: uniqueId('translated-word-id='),
        };
    },
    get(word: string): WordPair | null {
        return dictionary[word] || null;
    },
};
