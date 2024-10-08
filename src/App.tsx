import React, { useState, useCallback } from 'react';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import TodoList from './components/TodoList';
import FileHandling from './components/FileHandling';
import { Note } from './types';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([{ id: '1', content: '', title: 'Untitled' }]);
  const [activeNoteId, setActiveNoteId] = useState<string>('1');
  const [zoom, setZoom] = useState<number>(100);

  const handleNoteChange = useCallback((content: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === activeNoteId ? { ...note, content } : note
      )
    );
  }, [activeNoteId]);

  const handleZoom = useCallback((delta: number) => {
    setZoom(prevZoom => Math.max(50, Math.min(200, prevZoom + delta)));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Toolbar 
        onZoomIn={() => handleZoom(10)} 
        onZoomOut={() => handleZoom(-10)} 
      />
      <div className="flex-1 flex">
        <div className="w-3/4 p-4 h-[calc(100vh-64px)]">
          <Editor
            content={notes.find(note => note.id === activeNoteId)?.content || ''}
            onChange={handleNoteChange}
            zoom={zoom}
            setZoom={setZoom}
          />
        </div>
        <div className="w-1/4 bg-white p-4 border-l border-gray-200">
          <TodoList />
          <FileHandling notes={notes} setNotes={setNotes} />
        </div>
      </div>
    </div>
  );
};

export default App;