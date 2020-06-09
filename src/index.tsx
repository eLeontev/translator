import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Translator } from './components/translator';
import { getTranslatedValues } from './services/translate.service';
import { distionaryInterface } from './state/state';

const renderApp = async () => {
    ReactDOM.render(
        <Translator
            getTranslatedValues={getTranslatedValues(distionaryInterface)}
        />,
        document.getElementById('root')
    );
};

renderApp();
