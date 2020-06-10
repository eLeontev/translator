import { Text, WordPairToDisplay } from '../models/models';

export const userInputDelay = 300;
export const minWordLengthToTranslate = 3;
export const initialText: Text = {
    text: '',
    previousText: '',
};

export const initialWordPairToDisplay: WordPairToDisplay = {
    wordPair: {
        key: '',
        translatedValue: '',
        word: '',
    },
    action: null,
};
