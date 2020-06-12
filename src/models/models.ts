import { OrderedMap, List } from 'immutable';

export type WordPair = {
    key: string;
    word: string;
    translatedValue: string;
};

export const ADD = 'ADD';
export const DELETE = 'DELETE';
export type Actions = typeof ADD | typeof DELETE;

export type WordPairToDisplay = {
    wordPair: WordPair;
    action: Actions | null;
};

export type WordPairs = List<WordPair>;

export type Dictionary = {
    [word: string]: WordPair;
};

export type DictionaryInterface = {
    set(word: string, translatedValue: string): void;
    get(word: string): WordPair | null;
};

export type ListOfWordsToTranslate = Array<string>;
export type TranslatedwWordsMap = {
    [word: string]: string;
};

export type Text = {
    text: string;
    previousText: string;
};

export type TextareaProps = {
    text: string;
    onChange(text: Text): void;
};

export type TranslatorProps = {
    getTextWithHints: GetTextWithHints;
    dictionaryInterface: DictionaryInterface;
};

export type TextWithHintsProps = {
    textWithHints: WordPairs;
    setWordPairs(wordPair: WordPair): void;
};

export type HintsProps = {
    deleteHint(wordPair: WordPair): void;
    wordPairs: OrderedMap<string, WordPair>;
};

export type HintProps = {
    deleteHint(): void;
    wordPair: WordPair;
};

export type WordWithHintProps = {
    wordPair: WordPair;
    setWordPairs(): void;
};

export type SetterForUseState<V> = (value: V) => void;

export type GetTextWithHints = (
    text: Text,
    textWithHints: List<WordPair>
) => WordPairs;

export type ChangedWordData = {
    index: number;
    isFound: boolean;
    word: string;
    wordsToTranslate: Array<string>;
};

export type TranslatedWordData = {
    index: number;
    word: string;
};
