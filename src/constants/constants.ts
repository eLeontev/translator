import { Text, WordPairToDisplay, ChangedWordData } from '../models/models';

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

export const emptyChangedWordData: ChangedWordData = {
    index: 0,
    isFound: false,
    word: '',
    wordsToTranslate: [],
};
