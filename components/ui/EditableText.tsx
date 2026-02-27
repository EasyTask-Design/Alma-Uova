'use client';

import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
    initialValue: string;
    onSave: (value: string) => void;
    isEditing: boolean;
    tagName?: keyof React.JSX.IntrinsicElements;
    className?: string;
    multiline?: boolean;
}

export default function EditableText({
    initialValue,
    onSave,
    isEditing,
    tagName = 'span',
    className = '',
    multiline = false,
}: EditableTextProps) {
    const [value, setValue] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);
    const editableRef = useRef<HTMLElement>(null);

    // Update internal value when prop changes
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleBlur = () => {
        setIsFocused(false);
        if (value !== initialValue) {
            onSave(value);
        }
    };

    if (!isEditing) {
        // Render static element
        return React.createElement(tagName, {
            className,
            dangerouslySetInnerHTML: { __html: value },
        });
    }

    // Render editable element
    if (multiline) {
        return (
            <textarea
                className={`w-full bg-slate-100 border border-amber-300 rounded p-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 ${className}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
                onFocus={() => setIsFocused(true)}
                rows={4}
            />
        );
    }

    return (
        <input
            type="text"
            className={`w-full bg-slate-100 border border-amber-300 rounded px-2 py-1 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 ${className}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            onFocus={() => setIsFocused(true)}
        />
    );
}
