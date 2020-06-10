import React from 'react';

import { WordPair, HintProps, HintsProps } from '../models/models';

export const Hint = React.memo<HintProps>(
    ({ wordPair: { translatedValue, word }, deleteHint }: HintProps) => (
        <div>
            {word} - <b>{translatedValue} </b>
            <i className="active" onClick={() => deleteHint()}>
                *remove
            </i>
        </div>
    ),
    (prev, cur) => prev.wordPair.word === cur.wordPair.word
);

export const Hints = React.memo<HintsProps>(
    ({ wordPairs, deleteHint }: HintsProps) =>
        wordPairs.size ? (
            <div>
                <h3>Hints</h3>
                {wordPairs
                    .valueSeq()
                    .toList()
                    .map((wordPair: WordPair) => (
                        <Hint
                            key={wordPair.key}
                            wordPair={wordPair}
                            deleteHint={() => deleteHint(wordPair)}
                        />
                    ))}
            </div>
        ) : null,
    (prev, cur) => prev.wordPairs === cur.wordPairs
);
