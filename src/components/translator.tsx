import React, { useState, useEffect } from 'react';
import { OrderedMap, List } from 'immutable';

import { Textarea } from './textarea';
import { TextWithHints } from './text-with-hints';
import { Hints } from './Hints';

import { initialText, initialWordPairToDisplay } from '../constants/constants';
import { useTranslateWords } from '../effects/translate.words.effect';

import { TranslatorProps, WordPair, ADD, DELETE } from '../models/models';
import { useUpdateHints } from '../effects/update-hints.effect';

export const Translator = ({ getTranslatedValues }: TranslatorProps) => {
    const [{ text, previousText }, updateTextArea] = useState(initialText);
    const [textWithHints, setTextWithHints] = useState(List<WordPair>());
    const [wordPairs, setWordPairs] = useState(OrderedMap<string, WordPair>());
    const [wordPairToDisplay, updateWordToDisplay] = useState(
        initialWordPairToDisplay
    );

    useTranslateWords(
        { text, previousText },
        textWithHints,
        setTextWithHints,
        getTranslatedValues
    );

    useUpdateHints(wordPairs, setWordPairs, wordPairToDisplay);

    return (
        <div>
            <h3>Put here a text to translate</h3>
            <Textarea text={text} onChange={updateTextArea} />
            <TextWithHints
                textWithHints={textWithHints}
                setWordPairs={(wordPair) =>
                    updateWordToDisplay({ wordPair, action: ADD })
                }
            />
            <Hints
                wordPairs={wordPairs}
                deleteHint={(wordPair) =>
                    updateWordToDisplay({ wordPair, action: DELETE })
                }
            />
        </div>
    );
};
