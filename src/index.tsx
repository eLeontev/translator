import * as React from 'react';
import * as ReactDOM from 'react-dom';

const renderApp = async () => {
    const { App } = await import('./entry');
    ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
