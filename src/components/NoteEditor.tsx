import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { NoteProps } from "../types";

type NoteEditorProps = {
  note: NoteProps;
  onChange: (content: JSONContent) => void;
};

const NoteEditor = ({ note, onChange }: NoteEditorProps) => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Placeholder.configure({
          // Use a placeholder:
          emptyEditorClass: 'is-editor-empty',
        }),
      ],
      content: note.content,
      editorProps: {
        attributes: {
          class: "outline-none flex flex-col flex-1",
        },
      },

      onUpdate: ({ editor }) => {
        onChange(editor.getJSON());
      },
    },
    [note.id]
  );

  return (
    <div className="min-h-screen flex flex-col flex-1">
      {/* Toolbar */}
      <div className="flex items-center border-b-2 p-6 gap-1">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={
            editor?.isActive("bold") ? "is-active bg-gray-200 px-2" : "px-2"
          }
        >
          Bold
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={
            editor?.isActive("italic") ? "is-active bg-gray-200 px-2" : "px-2"
          }
        >
          Italic
        </button>
      </div>
      <EditorContent
        className="overflow-auto flex flex-1 flex-col px-6"
        editor={editor}
      />
    </div>
  );
};

export default NoteEditor;
