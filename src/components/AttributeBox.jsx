import { useState, useEffect } from 'react';

export default function AttributeBox({ id, label }) {
  // load saved value or default
  const [value, setValue]   = useState(() => {
    const saved = localStorage.getItem(`attr:${id}:value`);
    return saved ? Number(saved) : 0;
  });
  const [notes, setNotes]   = useState(() => localStorage.getItem(`attr:${id}:notes`) || '');

  // save whenever value or notes change
  useEffect(() => {
    localStorage.setItem(`attr:${id}:value`, value);
    localStorage.setItem(`attr:${id}:notes`, notes);
  }, [value, notes, id]);

  // click cycles 0→5
  const cycle = () => setValue(v => (v + 1) % 6);

  return (
    <div className="bg-black/50 aspect-square flex flex-col">
      <div className="h-1/4 flex items-center justify-center border-b border-white/20">
        {label}
      </div>

      <button
        className="h-1/2 flex items-center justify-center text-4xl select-none"
        onClick={cycle}
      >
        {value}
      </button>

      <textarea
        className="h-1/4 border-t border-white/20 text-xs px-2 py-1 bg-transparent resize-none focus:outline-none"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="notes…"
      />
    </div>
  );
}
