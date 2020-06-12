import React from 'react';

import { WordPair, HintProps, HintsProps } from '../models/models';

export const Hint = React.memo<HintProps>(
    ({ wordPair: { translatedValue, word, key }, deleteHint }: HintProps) => (
        <div className="word-with-hint">
            {word}
            <span> - </span>
            <b>
                {translatedValue}{' '}
                <i className="active" onClick={() => deleteHint()}>
                    *remove
                </i>
            </b>
        </div>
    ),
    (prev, cur) => prev.wordPair.word === cur.wordPair.word
);

export const Hints = React.memo<HintsProps>(
    ({ wordPairs, deleteHint }: HintsProps) =>
        wordPairs.size ? (
            <div className="hints-container">
                <h3>Hints</h3>
                <div className="hints">
                    {wordPairs.valueSeq().map((wordPair: WordPair) => (
                        <Hint
                            key={wordPair.word}
                            wordPair={wordPair}
                            deleteHint={() => deleteHint(wordPair)}
                        />
                    ))}
                </div>
            </div>
        ) : null,
    (prev, cur) => prev.wordPairs === cur.wordPairs
);
