import React from 'react';
import { TextWithHints, LetterWithTranslatedValue } from '../models/models';

export const TextWithHintsComponent = ({
    textWithHints,
}: {
    textWithHints: TextWithHints;
}) => (
    <div>
        {textWithHints.map(
            ({ letter, translatedValue, key }: LetterWithTranslatedValue) => (
                <a key={key} href={translatedValue}>
                    {letter}{' '}
                </a>
            )
        )}
    </div>
);
