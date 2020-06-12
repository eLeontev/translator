import React from 'react';

import { minWordLengthToTranslate } from '../constants/constants';

import {
    WordPair,
    TextWithHintsProps,
    WordWithHintProps,
} from '../models/models';

export const WordWithHint = React.memo<WordWithHintProps>(
    ({ wordPair, setWordPairs }: WordWithHintProps) => {
        const { word } = wordPair;
        const shouldDisplayHint =
            word.replace(/\W/g, '').length > minWordLengthToTranslate;

        return (
            <>
                <span
                    className={shouldDisplayHint ? 'active' : null}
                    onClick={() => shouldDisplayHint && setWordPairs()}
                >
                    {`${word}`}
                </span>{' '}
            </>
        );
    },
    (prev, cur) => prev.wordPair.key === cur.wordPair.key
);

export const TextWithHints = React.memo<TextWithHintsProps>(
    ({ textWithHints, setWordPairs }: TextWithHintsProps) => (
        <div>
            <h3>Text with hints</h3>
            {textWithHints.map((wordPair: WordPair) => (
                <WordWithHint
                    key={wordPair.key}
                    wordPair={wordPair}
                    setWordPairs={() => setWordPairs(wordPair)}
                />
            ))}
        </div>
    ),
    (prev, cur) => prev.textWithHints === cur.textWithHints
);
