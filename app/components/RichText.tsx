"use client";
import { Config } from "jodit/esm/config";
import dynamic from "next/dynamic";
import { useRef, useMemo } from "react";

// It is highly recommended to keep ssr: false for Jodit in Next.js
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type props = {
    value: string;
    onchange: (value: string) => void;
};

export default function RichTextEditor({ value, onchange }: props) {
    const editor = useRef(null);

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typing...',
            removeButtons: [
                "image", "audio", "video", "paint", "file",
                "source", "print", "save", "speechRecognize",
                "show all", "sound", "microphone",
            ],
        }),
        []
    );

    return (
        <div>
            <JoditEditor
                ref={editor}
                className="reset"
                value={value} // This is the initial value
                config={config}

                // Use onBlur instead of onChange to prevent the cursor jump
                onBlur={(newContent) => onchange(newContent)}
            // Alternatively, if you MUST use onChange, use a debounce function
            />
        </div>
    );
}