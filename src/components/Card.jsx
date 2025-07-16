import { useState } from 'react';

/**
 * Collapsible card.
 * Props
 * ─────────────────────────────────────────────
 * id          unique key (not stored here)
 * title       string
 * body        string
 * skill       string  (optional)
 * showSkill   boolean (display Skill input when true)
 * editable    boolean (global Edit‑Character toggle)
 * onChange    fn(patch)  patch = {title?, body?, skill?}
 * onDelete    fn()       optional
 */
export default function Card({
  title,
  body,
  skill,
  showSkill = false,
  editable,
  onChange,
  onDelete,
}) {
  const [open, setOpen] = useState(false);

  /* helpers for controlled inputs */
  const edit = (field) => (e) => onChange({ [field]: e.target.value });

  return (
    <div className="bg-black/40 border border-white/20 mb-2">
      {/* header */}
      <div
        className="flex justify-between items-center px-3 py-2 cursor-pointer select-none"
        onClick={() => setOpen((o) => !o)}
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

      {/* body */}
      {open && (
        <div className="px-3 pb-3">
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
              className="mt-2 text-xs text-red-400 hover:text-red-200"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
