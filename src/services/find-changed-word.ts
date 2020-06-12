import { List } from 'immutable';

import { emptyChangedWordData } from '../constants/constants';

const isSeparatorChanged = (
    iterableList: Array<string>,
    comparedList: Array<string>
) => iterableList.join('') === comparedList.join('');

const countOfWordsIsNotChanged = (
    iterableList: Array<string>,
    comparedList: Array<string>
) => iterableList.length === comparedList.length;

const setComparedArrays = (a: Array<string>, b: Array<string>) => (
    min: number,
    max: number
) => a.slice(min, max).join('') === b.slice(min, max).join('');

export const findChangedWordIndex = (
    previousText: string,
    textList: Array<string>,
    isSingleSymbolChanged: boolean
) => {
    const previousTextList = previousText.split(' ');

    debugger;
    if (
        !isSingleSymbolChanged ||
        (countOfWordsIsNotChanged(previousTextList, textList) &&
            isSeparatorChanged(previousTextList, textList))
    ) {
        return emptyChangedWordData;
    }

    let start = 0;
    let end = Math.max(textList.length, previousTextList.length);

    const comparedArraysValuesInRange = setComparedArrays(
        previousTextList,
        textList
    );

    let isIndexNotDefined = true;
    let limit = 5;
    let i = 0;
    debugger;
    while (isIndexNotDefined) {
        if (i > limit) {
            debugger;
            return emptyChangedWordData;
        }
        const halfOfLength = Math.ceil((start + end) / 2);
        if (comparedArraysValuesInRange(start, halfOfLength)) {
            start = halfOfLength;
        } else {
            end = halfOfLength;
        }

        if (end - start === 1) {
            isIndexNotDefined = false;
        }
        i++;
    }

    const word = textList[start];
    return { index: start, isFound: true, word, wordsToTranslate: [word] };
};
