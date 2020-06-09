import React, { useState, useEffect } from 'react';

import { Textarea } from './textarea';
import { TextWithHintsComponent } from './text-with-hints';

import { initialText } from '../constants/constants';
import { callSetTranslationState } from '../services/translate.state.service';

import { TranslatorProps } from '../models/models';

export const Translator = ({ getTranslatedValues }: TranslatorProps) => {
    const [{ text, previousText }, updateTextArea] = useState(initialText);
    const [textWithHints, setTextWithHints] = useState([]);

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
            <TextWithHintsComponent textWithHints={textWithHints} />
        </div>
    );
};
