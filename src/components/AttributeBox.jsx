import { useState, useEffect } from 'react';

export default function AttributeBox({ id, label, editable }) {
  const [value, setValue] = useState(() =>
    Number(localStorage.getItem(`attr:${id}:value`) ?? 0)
  );
  const [notes, setNotes] = useState(
    () => localStorage.getItem(`attr:${id}:notes`) || ''
  );

  useEffect(() => {
    localStorage.setItem(`attr:${id}:value`, value);
    localStorage.setItem(`attr:${id}:notes`, notes);
  }, [id, value, notes]);

  const cycle = () => setValue(v => (v + 1) % 6);

  return (
    <div className="bg-black/50 aspect-square flex flex-col">
      <div className="h-1/4 flex items-center justify-center border-b border-white/20">
        {label}
      </div>

      <button
        className={`h-1/2 flex items-center justify-center text-4xl select-none ${
          editable ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
        }`}
        onClick={editable ? cycle : undefined}
      >
        {value}
      </button>

      <textarea
        className={`h-1/4 border-t border-white/20 text-xs px-2 py-1 bg-transparent resize-none focus:outline-none ${
          editable ? '' : 'pointer-events-none opacity-50'
        }`}
        readOnly={!editable}
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="notes…"
      />
    </div>
  );
}
