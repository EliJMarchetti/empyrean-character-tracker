import { useState, useEffect } from 'react';

export default function AttributeBox({ id, label }) {
  // ── persistent state ──────────────────────────────────────────────
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(`attr:${id}:value`);
    return stored ? Number(stored) : 0;
  });
  const [notes, setNotes] = useState(
    () => localStorage.getItem(`attr:${id}:notes`) || ''
  );

  // save on change
  useEffect(() => {
    localStorage.setItem(`attr:${id}:value`, value);
    localStorage.setItem(`attr:${id}:notes`, notes);
  }, [id, value, notes]);

  // ── UI‑only state: checkbox (not persisted) ────────────────────────
  const [unlocked, setUnlocked] = useState(false);

  const cycle = () => {
    if (unlocked) setValue(v => (v + 1) % 6);
  };

  return (
    <div className="bg-black/50 aspect-square flex flex-col">
      {/* label */}
      <div className="h-1/4 flex items-center justify-center border-b border-white/20">
        {label}
      </div>

      {/* number (clickable only if unlocked) */}
      <button
        className={`h-1/2 flex items-center justify-center text-4xl select-none ${
          unlocked ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
        }`}
        onClick={cycle}
      >
        {value}
      </button>

      {/* notes + unlock checkbox */}
      <div className="h-1/4 border-t border-white/20 text-xs px-2 py-1 flex gap-2 items-start">
        <textarea
          className="flex-1 bg-transparent resize-none focus:outline-none"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="notes…"
        />
        {/* tiny checkbox */}
        <input
          type="checkbox"
          checked={unlocked}
          onChange={e => setUnlocked(e.target.checked)}
          title="unlock for editing"
          className="mt-1 accent-white"
        />
      </div>
    </div>
  );
}
