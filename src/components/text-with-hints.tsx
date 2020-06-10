import React from 'react';

import { minWordLengthToTranslate } from '../constants/constants';

import {
    TextWithHintsComponentProps,
    WordWithTranslatedValueWithKey,
    WordWithHintProps,
} from '../models/models';

export const WordWithHint = ({
    wordWithTranslatedValueWithKey,
    setWordPairs,
}: WordWithHintProps) => {
    const { word, key } = wordWithTranslatedValueWithKey;
    const shouldDisplayHint = word.length > minWordLengthToTranslate;

    return (
        <>
            <span
                className={shouldDisplayHint ? 'active' : null}
                onClick={() =>
                    shouldDisplayHint &&
                    setWordPairs(wordWithTranslatedValueWithKey)
                }
            >
                {`${word}`}
            </span>{' '}
        </>
    );
};

export const TextWithHintsComponent = ({
    textWithHints,
    setWordPairs,
}: TextWithHintsComponentProps) => (
    <div>
        {textWithHints.map(
            (
                wordWithTranslatedValueWithKey: WordWithTranslatedValueWithKey
            ) => (
                <WordWithHint
                    key={wordWithTranslatedValueWithKey.key}
                    wordWithTranslatedValueWithKey={
                        wordWithTranslatedValueWithKey
                    }
                    setWordPairs={setWordPairs}
                />
            )
        )}
    </div>
);
