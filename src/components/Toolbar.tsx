import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onZoomIn, onZoomOut }) => {
  return (
    <div className="bg-gray-800 text-white p-2 flex justify-between items-center">
      <div className="text-xl font-bold">Advanced Notepad</div>
      <div className="flex items-center">
        <button onClick={onZoomOut} className="p-1 mr-2">
          <ZoomOut size={20} />
        </button>
        <button onClick={onZoomIn} className="p-1 mr-2">
          <ZoomIn size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;