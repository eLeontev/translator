import React, { useState, useEffect } from 'react';

import { Textarea } from './textarea';
import { TextWithHintsComponent } from './text-with-hints';
import { TranslatedValue } from './translated-value';

import {
    initialText,
    initialWordWithTranslatedValueWithKey,
} from '../constants/constants';
import { callSetTranslationState } from '../services/translate.state.service';

import {
    TranslatorProps,
    WordWithTranslatedValueWithKey,
} from '../models/models';

export const Translator = ({ getTranslatedValues }: TranslatorProps) => {
    const [{ text, previousText }, updateTextArea] = useState(initialText);
    const [textWithHints, setTextWithHints] = useState([]);
    const [wordPairs, setWordPairs] = useState(
        new Map<string, WordWithTranslatedValueWithKey>()
    );

    useEffect(() => {
        callSetTranslationState(
            { text, previousText },
            setTextWithHints,
            getTranslatedValues
        );
    }, [text]);

    return (
        <div>
            <h3>Put here a text to translate</h3>
            <Textarea text={text} onChange={updateTextArea} />
            <TextWithHintsComponent
                textWithHints={textWithHints}
                setWordPairs={(wordPair: WordWithTranslatedValueWithKey) =>
                    setWordPairs(
                        new Map(wordPairs.set(wordPair.word, wordPair))
                    )
                }
            />
            <TranslatedValue
                wordPairs={wordPairs}
                deleteHint={(word: string) =>
                    wordPairs.delete(word) && setWordPairs(new Map(wordPairs))
                }
            />
        </div>
    );
};
