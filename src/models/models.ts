export type LetterWithTranslatedValueWithoutKey = {
    letter: string;
    translatedValue: string;
};
export type LetterWithTranslatedValue = LetterWithTranslatedValueWithoutKey & {
    key: string;
};

export type TextWithHints = Array<LetterWithTranslatedValue>;

export type Dictionary = {
    [letter: string]: LetterWithTranslatedValueWithoutKey;
};

export type DictionaryInterface = {
    set(letter: string, translatedValue: string): void;
    get(letter: string): LetterWithTranslatedValueWithoutKey | null;
};

export type ListOfLettersToTranslate = Array<string>;
export type TranslatedLettersMap = {
    [letter: string]: string;
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

export type SetterForUseState<V> = (value: V) => void;

export type GetTranslatedValues = (text: Text) => Promise<TextWithHints>;
