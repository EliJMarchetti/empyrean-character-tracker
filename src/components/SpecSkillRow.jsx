import { useState } from 'react';
const CYCLE = ['', '+', '++', '–', '––'];

export default function SpecSkillRow({ skill, onChange, editable }) {
  const [mark, setMark] = useState(skill.mark || '');

  const advance = () => {
    const next = CYCLE[(CYCLE.indexOf(mark) + 1) % CYCLE.length];
    setMark(next);
    onChange({ ...skill, mark: next });
  };

  return (
    <div
      className={`flex justify-between px-2 py-1 ${
        editable ? 'cursor-pointer hover:bg-white/10' : 'opacity-50'
      } select-none text-sm`}
      onClick={editable ? advance : undefined}
    >
      <input
        className={`bg-transparent outline-none flex-1 ${
          editable ? '' : 'pointer-events-none'
        }`}
        value={skill.label}
        placeholder="Skill name…"
        onChange={e => onChange({ ...skill, label: e.target.value })}
      />
      <span className="w-6 text-center">{mark}</span>
    </div>
  );
}
