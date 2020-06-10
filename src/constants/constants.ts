import { Text, WordWithTranslatedValueWithKey } from '../models/models';

export const userInputDelay = 300;
export const minWordLengthToTranslate = 3;
export const initialText: Text = {
    text: '',
    previousText: '',
};
export const initialWordWithTranslatedValueWithKey: WordWithTranslatedValueWithKey = {
    translatedValue: '',
    word: '',
    key: '',
};
