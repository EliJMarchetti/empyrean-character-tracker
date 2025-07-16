import { useState, useEffect } from 'react';

/**
 * Reusable attribute square
 * - Click the large number to cycle 0 → 5 → 0
 * - Notes field is editable
 * - Data is kept in localStorage under keys attr:{id}:value / attr:{id}:notes
 */
export default function AttributeBox({ id, label }) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(`attr:${id}:value`);
    return stored ? Number(stored) : 0;
  });
  const [notes, setNotes] = useState(
    () => localStorage.getItem(`attr:${id}:notes`) || ''
  );

  useEffect(() => {
    localStorage.setItem(`attr:${id}:value`, value);
    localStorage.setItem(`attr:${id}:notes`, notes);
  }, [id, value, notes]);

  return (
    <div className="bg-black/50 aspect-square flex flex-col">
      <div className="h-1/4 flex items-center justify-center border-b border-white/20">
        {label}
      </div>

      <button
        className="h-1/2 flex items-center justify-center text-4xl select-none"
        onClick={() => setValue(v => (v + 1) % 6)}
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
