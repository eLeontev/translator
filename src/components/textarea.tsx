import React from 'react';

import { TextareaProps } from '../models/models';

export const Textarea = ({ text, onChange }: TextareaProps) => (
    <textarea
        value={text}
        onChange={({ target: { value } }) =>
            onChange({ text: value, previousText: text })
        }
    ></textarea>
);
