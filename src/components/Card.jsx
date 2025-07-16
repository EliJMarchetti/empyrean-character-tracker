import { useState } from 'react';
import SpecSkillRow from './SpecSkillRow';

export default function Card({
  title,
  body,
  skill,
  specSkills = [],
  showSkill = false,
  showSpecSkills = false,
  editable,
  onChange,
  onDelete,
}) {
  const [open, setOpen] = useState(false);

  /* helper setters */
  const edit = field => e => onChange({ [field]: e.target.value });

  const addSpecSkill = () =>
    onChange({
      specSkills: [
        ...specSkills,
        { id: Date.now(), label: '', mark: '' },
      ],
    });

  const updateSpecSkill = (idx, patch) =>
    onChange({
      specSkills: specSkills.map((s, i) =>
        i === idx ? patch : s
      ),
    });

  return (
    <div className="bg-black/40 border border-white/20 mb-2">
      {/* ── Header (click to toggle) ───────────────────── */}
      <div
        className="flex justify-between items-center px-3 py-2 cursor-pointer select-none"
        onClick={() => setOpen(o => !o)}
      >
        {editable ? (
          <div className="flex-1 flex gap-1">
            <input
              className="flex-1 bg-transparent outline-none"
              placeholder="Title…"
              value={title}
              onChange={edit('title')}
            />
            {showSkill && (
              <input
                className="w-28 bg-transparent outline-none text-right"
                placeholder="Skill"
                value={skill}
                onChange={edit('skill')}
              />
            )}
          </div>
        ) : (
          <span>
            {title || <em className="opacity-50">Untitled</em>}
            {showSkill && skill && ` (${skill})`}
          </span>
        )}

        <span>{open ? '▾' : '▸'}</span>
      </div>

      {/* ── Collapsible description (now above skills) ── */}
      {open && (
        <div className="px-3">
          {editable ? (
            <textarea
              className="w-full bg-transparent outline-none resize-none"
              rows={4}
              placeholder="Description…"
              value={body}
              onChange={edit('body')}
            />
          ) : (
            <p className="whitespace-pre-wrap text-sm">{body}</p>
          )}

          {editable && onDelete && (
            <button
              className="mt-3 text-xs text-red-400 hover:text-red-200"
              onClick={onDelete}
            >
              Delete
            </button>
          )}

          {/* Add‑Skill button sits with description when editing */}
          {showSpecSkills && editable && (
            <button
              className="mt-2 text-xs bg-black/40 px-2 py-1 border border-white/20 hover:border-white"
              onClick={addSpecSkill}
            >
              ＋ Add Skill
            </button>
          )}
        </div>
      )}

      {/* ── Always‑visible specialization skills (bottom) ─ */}
      {showSpecSkills && (
        <div className="px-3 pt-2 pb-3 border-t border-white/20">
          {specSkills.map((sk, idx) => (
            <SpecSkillRow
              key={sk.id}
              skill={sk}
              editable={editable}
              onChange={patch => updateSpecSkill(idx, patch)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
