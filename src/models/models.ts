export type WordWithTranslatedValue = {
    word: string;
    translatedValue: string;
};
export type WordWithTranslatedValueWithKey = WordWithTranslatedValue & {
    key: string;
};

export type TextWithHints = Array<WordWithTranslatedValueWithKey>;

export type Dictionary = {
    [word: string]: WordWithTranslatedValue;
};

export type DictionaryInterface = {
    set(word: string, translatedValue: string): void;
    get(word: string): WordWithTranslatedValue | null;
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
    getTranslatedValues: GetTranslatedValues;
};

export type TextWithHintsComponentProps = {
    textWithHints: TextWithHints;
    setWordPairs(wordPair: WordWithTranslatedValueWithKey): void;
};

export type TranslatedValueProps = {
    deleteHint(word: string): void;
    wordPairs: Map<string, WordWithTranslatedValueWithKey>;
};

export type WordWithHintProps = {
    wordWithTranslatedValueWithKey: WordWithTranslatedValueWithKey;
    setWordPairs(
        wordWithTranslatedValueWithKey: WordWithTranslatedValueWithKey
    ): void;
};

export type SetterForUseState<V> = (value: V) => void;

export type GetTranslatedValues = (text: Text) => Promise<TextWithHints>;
