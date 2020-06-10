import { Dictionary, DictionaryInterface, WordPair } from '../models/models';

const dictionary: Dictionary = {};

export const distionaryInterface: DictionaryInterface = {
    set(word: string, translatedValue: string): void {
        dictionary[word] = {
            word,
            translatedValue,
            key: '',
        };
    },
    get(word: string): WordPair | null {
        return dictionary[word] || null;
    },
};
