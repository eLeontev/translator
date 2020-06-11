import { useEffect } from 'react';
import { List } from 'immutable';

import {
    GetTranslatedValues,
    SetterForUseState,
    WordPairs,
    Text,
    WordPair,
} from '../models/models';

export const setTranslatorsState = async (
    text: Text,
    textWithHints: List<WordPair>,
    setTextWithHints: SetterForUseState<WordPairs>,
    getTranslatedValues: GetTranslatedValues
) => {
    setTextWithHints(await getTranslatedValues(text, textWithHints));
};

export const useTranslateWords = (
    { text, previousText }: Text,
    textWithHints: List<WordPair>,
    setTextWithHints: SetterForUseState<WordPairs>,
    getTranslatedValues: GetTranslatedValues
) => {
    useEffect(() => {
        setTranslatorsState(
            { text, previousText },
            textWithHints,
            setTextWithHints,
            getTranslatedValues
        );
    }, [text]);
};
