import debounce from 'lodash.debounce';

import {
    GetTranslatedValues,
    SetterForUseState,
    TextWithHints,
    Text,
} from '../models/models';
import { userInputDelay } from '../constants/constants';

export const setTranslatorsState = async (
    text: Text,
    setTextWithHints: SetterForUseState<TextWithHints>,
    getTranslatedValues: GetTranslatedValues
) => {
    setTextWithHints(await getTranslatedValues(text));
};

export const debouncedSetTranslatorState = debounce(
    setTranslatorsState,
    userInputDelay
);

export const callSetTranslationState = (
    { text, previousText }: Text,
    setTextWithHints: SetterForUseState<TextWithHints>,
    getTranslatedValues: GetTranslatedValues
): void => {
    const isUserManualEditText =
        Math.abs(text.length - previousText.length) === 1;

    if (isUserManualEditText) {
        debouncedSetTranslatorState(
            { text, previousText },
            setTextWithHints,
            getTranslatedValues
        );
    } else {
        setTranslatorsState(
            { text, previousText },
            setTextWithHints,
            getTranslatedValues
        );
    }
};
