import { JSONContent } from "@tiptap/react";
import { useState } from "react";
import NoteEditor from "./components/NoteEditor";
import { NoteProps } from "./types";

// https://www.youtube.com/watch?v=z7z0PiiaBgw

function App() {
  const [notes, setNotes] = useState<Record<string, NoteProps>>({});
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const activeNote = activeNoteId ? notes[activeNoteId] : null;

  const handleCreateNewNote = () => {
    const newNote = {
      id: crypto.randomUUID(),
      title: `New note title`,
      content: "",
      updatedAt: new Date(),
    };

    setNotes((notes) => ({ ...notes, [newNote.id]: newNote }));

    setActiveNoteId(newNote.id);
  };

  const notesList = Object.values(notes).sort(
    (a, b) => b.updatedAt.getDate() - a.updatedAt.getTime()
  );

  const handleChangeActiveNote = (id: string) => {
    setActiveNoteId(id);
  };

  const handleChangeNoteContent = (id: string, content: JSONContent) => {
    setNotes((notes) => ({
      ...notes,
      [id]: {
        ...notes[id],
        updatedAt: new Date(),
        content
      },
    }));
  };

  return (
    <div className="min-h-screen overflow-hidden flex">
      <div className="min-h-screen w-[15rem] flex flex-col  border-r border-gray-300 overflow-auto">
        <button
          className="m-6 p-2 bg-white rounded shadow-md	
          border border-gray-200 font-semibold text-gray-600 cursor-pointer hover:border-gray-400"
          onClick={handleCreateNewNote}
        >
          New Note
        </button>
        {/* Sidebar List */}
        <div className="flex flex-col overflow-auto gap-1 py-2">
          {notesList.map((note: NoteProps) => (
            <div
              key={note.id}
              role="button"
              tabIndex={0}
              className={`p-2 mx-6 cursor-pointer rounded 
               ${
                 activeNoteId === note.id
                   ? "bg-slate-500 "
                   : "hover:bg-gray-100"
               }`}
              onClick={() => handleChangeActiveNote(note.id)}
            >
              {note.title}
            </div>
          ))}
        </div>
      </div>
      {/* Editor container */}
      {activeNote ? (
        <NoteEditor
          note={activeNote}
          onChange={(content) =>
            handleChangeNoteContent(activeNote.id, content)
          }
        />
      ) : (
        <div>Create A New Note or select one</div>
      )}
    </div>
  );
}

export default App;
