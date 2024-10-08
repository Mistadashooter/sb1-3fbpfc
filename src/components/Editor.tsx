import React, { useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onChange, zoom, setZoom }) => {
  const quillRef = useRef<ReactQuill>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAutoZoomed, setIsAutoZoomed] = useState(false);

  useEffect(() => {
    if (quillRef.current && containerRef.current) {
      const editor = quillRef.current.getEditor();
      editor.root.style.fontSize = `${zoom}%`;

      const checkContentHeight = () => {
        const quillContainer = containerRef.current?.querySelector('.ql-container');
        if (quillContainer) {
          const contentHeight = quillContainer.scrollHeight;
          const containerHeight = containerRef.current?.clientHeight || 0;

          if (contentHeight > containerHeight && !isAutoZoomed) {
            const newZoom = Math.max(50, Math.floor((containerHeight / contentHeight) * 100));
            setZoom(newZoom);
            setIsAutoZoomed(true);
          } else if (contentHeight <= containerHeight && isAutoZoomed) {
            setZoom(100);
            setIsAutoZoomed(false);
          }
        }
      };

      checkContentHeight();
      editor.on('text-change', checkContentHeight);

      return () => {
        editor.off('text-change', checkContentHeight);
      };
    }
  }, [zoom, setZoom, isAutoZoomed]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['image', 'link'],
      ['clean']
    ],
  };

  return (
    <div ref={containerRef} className="h-full overflow-auto">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={onChange}
        modules={modules}
        className="h-full"
      />
    </div>
  );
};

export default Editor;