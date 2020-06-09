import React from 'react';

import { TextareaProps } from '../models/models';

export const Textarea = ({ text, onChange }: TextareaProps) => (
    <textarea
        value={text}
        onChange={(event) =>
            onChange({ text: event.target.value, previousText: text })
        }
    ></textarea>
);
