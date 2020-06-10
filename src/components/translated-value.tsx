import React from 'react';

import {
    TranslatedValueProps,
    WordWithTranslatedValueWithKey,
} from '../models/models';

export const TranslatedValue = React.memo<TranslatedValueProps>(
    ({ wordPairs, deleteHint }: TranslatedValueProps) =>
        wordPairs.size ? (
            <div>
                <h3>Hints</h3>
                {Array.from(wordPairs.values()).map(
                    ({
                        word,
                        translatedValue,
                        key,
                    }: WordWithTranslatedValueWithKey) => (
                        <div key={key}>
                            {word} - <b>{translatedValue} </b>
                            <i
                                className="active"
                                onClick={() => deleteHint(word)}
                            >
                                *remove
                            </i>
                        </div>
                    )
                )}
            </div>
        ) : null,
    (prev, cur) => prev.wordPairs === cur.wordPairs
);
