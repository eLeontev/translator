import React, { useState } from 'react';
import { OrderedSet } from 'immutable';

import {
    TranslateErrorsProps,
    TranslateError,
    TranslateErrorProps,
} from '../models/models';

export const ErrorBLock = React.memo<TranslateErrorProps>(
    ({
        translateError: { errorMessage, word },
        removeErrorMessage,
    }: TranslateErrorProps) => (
        <div className="translate-error" onClick={removeErrorMessage}>
            <p className="ranslate-error__word">
                <b>Word:</b>
                <span> {word}</span>
            </p>
            <p className="ranslate-error__error-message">
                <b>Error:</b>
                <span> {errorMessage}</span>
            </p>
        </div>
    )
);

export const TranslateErrors = React.memo<TranslateErrorsProps>(
    ({ translateError, cleanupError }: TranslateErrorsProps) => {
        const [translateErrors, setTranslateError] = useState(
            OrderedSet<TranslateError>()
        );

        if (translateError && !translateErrors.has(translateError)) {
            cleanupError();
            setTranslateError(translateErrors.add(translateError));
        }

        return translateErrors.size ? (
            <div className="translate-errors">
                {translateErrors.map((translateError: TranslateError) => (
                    <ErrorBLock
                        key={translateError.key}
                        translateError={translateError}
                        removeErrorMessage={() =>
                            setTranslateError(
                                translateErrors.delete(translateError)
                            )
                        }
                    />
                ))}
            </div>
        ) : null;
    },
    (prev, cur) => prev.translateError === cur.translateError
);
