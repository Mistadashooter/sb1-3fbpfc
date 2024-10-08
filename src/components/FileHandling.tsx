import React from 'react';
import { Save, Upload } from 'lucide-react';
import { Note } from '../types';

interface FileHandlingProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const FileHandling: React.FC<FileHandlingProps> = ({ notes, setNotes }) => {
  const saveNote = () => {
    const noteToSave = notes[0]; // Assuming we're saving the first note for simplicity
    const blob = new Blob([JSON.stringify(noteToSave)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${noteToSave.title || 'untitled'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedNote = JSON.parse(e.target?.result as string) as Note;
          setNotes([loadedNote, ...notes.slice(1)]);
        } catch (error) {
          console.error('Error parsing file:', error);
          alert('Error loading file. Please try again.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">File Handling</h2>
      <div className="flex space-x-2">
        <button onClick={saveNote} className="flex items-center bg-green-500 text-white px-3 py-1 rounded">
          <Save size={20} className="mr-1" />
          Save
        </button>
        <label className="flex items-center bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
          <Upload size={20} className="mr-1" />
          Load
          <input type="file" onChange={loadNote} className="hidden" accept=".json" />
        </label>
      </div>
    </div>
  );
};

export default FileHandling;