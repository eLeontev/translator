import {
    Dictionary,
    DictionaryInterface,
    LetterWithTranslatedValueWithoutKey,
} from '../models/models';

const dictionary: Dictionary = {};

export const distionaryInterface: DictionaryInterface = {
    set(letter: string, translatedValue: string): void {
        dictionary[letter] = {
            letter,
            translatedValue,
        };
    },
    get(letter: string): LetterWithTranslatedValueWithoutKey | null {
        return dictionary[letter] || null;
    },
};
