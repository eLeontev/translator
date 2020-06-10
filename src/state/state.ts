import {
    Dictionary,
    DictionaryInterface,
    WordWithTranslatedValue,
} from '../models/models';

const dictionary: Dictionary = {};

export const distionaryInterface: DictionaryInterface = {
    set(word: string, translatedValue: string): void {
        dictionary[word] = {
            word,
            translatedValue,
        };
    },
    get(word: string): WordWithTranslatedValue | null {
        return dictionary[word] || null;
    },
};
