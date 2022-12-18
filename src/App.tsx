import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// https://www.youtube.com/watch?v=z7z0PiiaBgw
function App() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class: "outline-none flex flex-col flex-1",
      },
    },
  });

  return (
    <div className="min-h-screen overflow-hidden flex">
      <div className="min-h-screen w-[15rem] flex flex-col  border-r border-gray-300 overflow-auto">
        Sidebar
      </div>
      {/* Editor container */}
      <div className="min-h-screen flex flex-col flex-1">
        {/* Toolbar */}
        <div className="flex items-center border-b-2 p-6 gap-1">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={editor?.isActive("bold") ? "is-active bg-gray-200 px-2" : "px-2"}
          >
            Bold
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={editor?.isActive("italic") ? "is-active bg-gray-200 px-2" : "px-2"}
          >
            Italic
          </button>
        </div>
        <EditorContent
          className="overflow-auto flex flex-1 flex-col px-6"
          editor={editor}
        />
      </div>
    </div>
  );
}

export default App;
