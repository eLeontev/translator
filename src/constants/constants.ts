import { Text, WordPairToDisplay, ChangedWordData } from '../models/models';

export const apiDomen =
    'https://36slys7lab.execute-api.us-west-2.amazonaws.com';
export const apiEndpoint = `${apiDomen}/api-v1/translate`;

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

export const notFoundInDictionary = 'The word is not fond in the dictionary';
export const wordWasNotTranslated =
    'The word was not translated, it could be incorrect written';
