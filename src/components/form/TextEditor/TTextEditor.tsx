'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import { Controller, useFormContext } from 'react-hook-form';

import Toolbar from './Toolbar';
const TextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      BulletList,
      ListItem,
    ],
    content: value ?? '',
    editorProps: {
      attributes: {
        class:
          'rounded-b-lg bg-white p-4 outline-none min-h-[200px] border border-t-0 border-[#EAECF0]',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <label className="mb-2 block text-slate-600" htmlFor="desc">
        Content
      </label>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

const TTextEditor = ({ name }: { name: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextEditor value={field.value as string} onChange={field.onChange} />
      )}
    />
  );
};

export default TTextEditor;
