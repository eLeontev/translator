import React, { useState, useEffect } from 'react';
import { OrderedMap, List } from 'immutable';

import { Textarea } from './textarea';
import { TextWithHints } from './text-with-hints';
import { Hints } from './Hints';

import { initialText, initialWordPairToDisplay } from '../constants/constants';

import { TranslatorProps, WordPair, ADD, DELETE } from '../models/models';
import { useUpdateHints } from '../effects/update-hints.effect';

export const Translator = ({
    getTextWithHints,
    dictionaryInterface,
}: TranslatorProps) => {
    const [{ text, previousText }, updateTextArea] = useState(initialText);
    const [textWithHints, setTextWithHints] = useState(List<WordPair>());
    const [wordPairs, setWordPairs] = useState(OrderedMap<string, WordPair>());
    const [wordPairToDisplay, updateWordToDisplay] = useState(
        initialWordPairToDisplay
    );

    useEffect(() => {
        setTextWithHints(
            getTextWithHints({ text, previousText }, textWithHints)
        );
    }, [text]);

    useUpdateHints(
        wordPairs,
        wordPairToDisplay,
        dictionaryInterface,
        setWordPairs
    );

    return (
        <div className="translator">
            <section className="input">
                <h3>Put here a text to translate</h3>
                <Textarea text={text} onChange={updateTextArea} />
            </section>
            {textWithHints.size ? (
                <section className="output">
                    <TextWithHints
                        textWithHints={textWithHints}
                        setWordPairs={(wordPair) =>
                            updateWordToDisplay({ wordPair, action: ADD })
                        }
                    />
                </section>
            ) : null}

            <Hints
                wordPairs={wordPairs}
                deleteHint={(wordPair) =>
                    updateWordToDisplay({ wordPair, action: DELETE })
                }
            />
        </div>
    );
};
