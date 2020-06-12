import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Translator } from './components/translator';
import { getTextWithHints } from './services/get-text-with-hints';
import { dictionaryInterface } from './state/state';

export const renderApp = async () => {
    ReactDOM.render(
        <Translator
            getTextWithHints={getTextWithHints}
            dictionaryInterface={dictionaryInterface}
        />,
        document.getElementById('root')
    );
};
