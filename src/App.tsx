import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]") as string[];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add or Update Note
  const handleAdd = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updated = [...notes];
      updated[editIndex] = input;
      setNotes(updated);
      setEditIndex(null);
    } else {
      setNotes([...notes, input]);
    }

    setInput("");
    inputRef.current?.focus();
  };

  // Edit note
  const handleEdit = (i: number) => {
    setInput(notes[i]);
    setEditIndex(i);
    inputRef.current?.focus();
  };

  // Delete note
  const handleDelete = (i: number) => {
    const updated = notes.filter((_, index) => index !== i);
    setNotes(updated);
  };

  return (
    <div className="container">
      <h1>📝 Notes App</h1>

      <div className="input-box">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="empty">No notes yet.</p>
        ) : (
          notes.map((note, i) => (
            <div className="note-card" key={i}>
              <p>{note}</p>
              <div className="buttons">
                <button className="edit" onClick={() => handleEdit(i)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(i)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
