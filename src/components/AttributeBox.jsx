import { useState, useEffect } from 'react';

export default function AttributeBox({ id, label, editable }) {
  const [value, setValue] = useState(() =>
    Number(localStorage.getItem(`attr:${id}:value`) ?? 0)
  );

  useEffect(() => {
    localStorage.setItem(`attr:${id}:value`, value);
  }, [id, value]);

  const cycle = () => setValue(v => (v + 1) % 6);

  /* ---------- sub‑attribute logic ---------- */
  const calc = {
    Might:   v => 5 + v,
    Reflex:  v => Math.max(1, v),
    Wits:    v => 5 + v,
    Charm:   v => Math.max(1, v),
    Spirit:  v => 5 + v,
  }[label] ?? (_ => 0);

  const name = {
    Might:  'Inventory',
    Reflex: 'Suits',
    Wits:   'Hand',
    Charm:  'Assist',
    Spirit: 'Augments',
  }[label] ?? '';

  return (
    <div className="bg-black/50 aspect-square flex flex-col">
      {/* label */}
      <div className="h-1/4 flex items-center justify-center border-b border-white/20">
        {label}
      </div>

      {/* value (clickable when editing) */}
      <button
        className={`h-1/2 flex items-center justify-center text-4xl select-none ${
          editable ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
        }`}
        onClick={editable ? cycle : undefined}
      >
        {value}
      </button>

      {/* sub‑attribute display */}
      <div className="h-1/4 border-t border-white/20 text-xs flex items-center justify-center">
        {name}: {calc(value)}
      </div>
    </div>
  );
}
