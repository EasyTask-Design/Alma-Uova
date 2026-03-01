'use client';

import React, { useState, useRef } from 'react';

interface MediaUploaderProps {
    initialUrl: string;
    onUploadSuccess: (url: string) => void;
    isEditing: boolean;
    placeholderText?: string;
}

export default function MediaUploader({
    initialUrl,
    onUploadSuccess,
    isEditing,
    placeholderText = '[Media Placeholder]'
}: MediaUploaderProps) {
    const [url, setUrl] = useState(initialUrl);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            if (data.url) {
                setUrl(data.url);
                onUploadSuccess(data.url);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file.');
        } finally {
            setIsUploading(false);
            // Reset input so the same file can be uploaded again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
    const isAudio = url.match(/\.(mp3|wav|m4a|aac)$/i);

    const renderMedia = () => {
        if (!url) {
            return (
                <span className="text-[10px] uppercase font-bold text-slate-400">
                    {placeholderText}
                </span>
            );
        }

        if (isVideo) {
            if (isAudio) {
            return (
                <audio
                    src={url}
                    controls
                    className="w-full px-4"
                />
            );
        }

        return (
            <img
                src={url}
                alt="Uploaded media"
                className="w-full h-full object-cover rounded-2xl"
            />
        );
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {renderMedia()}

            {isEditing && (
                <div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <span className="text-white font-bold text-sm bg-amber-500 px-3 py-1 rounded-full">
                        {isUploading ? 'Caricamento...' : 'Cambia Media'}
                    </span>
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,video/*,audio/*"
            />
        </div>
    );
}
