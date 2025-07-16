import { useState, useEffect } from 'react';
const CYCLE = ['', '+', '++', '–', '––'];

export default function SkillRow({ id, label, editable }) {
  const [mark, setMark] = useState(() =>
    localStorage.getItem(`skill:${id}`) || ''
  );

  useEffect(() => {
    localStorage.setItem(`skill:${id}`, mark);
  }, [id, mark]);

  const advance = () => {
    const next = CYCLE[(CYCLE.indexOf(mark) + 1) % CYCLE.length];
    setMark(next);
  };

  return (
    <div
      className={`flex justify-between px-2 py-1 ${
        editable ? 'cursor-pointer hover:bg-white/10' : 'opacity-50'
      } select-none`}
      onClick={editable ? advance : undefined}
    >
      <span>{label}</span>
      <span className="w-6 text-center">{mark}</span>
    </div>
  );
}
