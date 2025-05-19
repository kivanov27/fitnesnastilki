'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

type EditorProps = {
    content: string | undefined;
    onChangeAction: (html: string) => void;
};

export default function Editor({ content, onChangeAction }: EditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        onUpdate: ({ editor }) => {
            onChangeAction(editor.getHTML());
        },
    });

    // For resetting or setting initial content
    useEffect(() => {
        if (content && editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content]);

    return (
        <div className="w-full bg-white p-2 border rounded-md">
            <EditorContent editor={editor} />
        </div>
    );
}
