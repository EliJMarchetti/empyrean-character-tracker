import { useState } from 'react';

const SUITS = ['♥', '♣', '♦', '♠'];
const WEAPON_RANGES = ['Melee', 'Ranged', 'Long Ranged'];
const MARK_CYCLE = ['', '+', '++', '–', '––'];

export default function InventoryCard({ item, editable, onChange, onDelete }) {
  const [open, setOpen] = useState(false);

  /* helpers --------------------------------------------------------- */
  const patch = (p) => onChange({ ...item, ...p });

  /* Gear suit toggle */
  const toggleSuit = (s) =>
    patch({
      suits: item.suits.includes(s)
        ? item.suits.filter((x) => x !== s)
        : [...item.suits, s],
    });

  /* Weapon skill‑mark cycle */
  const advanceMark = () =>
    patch({
      skillMark:
        MARK_CYCLE[(MARK_CYCLE.indexOf(item.skillMark || '') + 1) % MARK_CYCLE.length],
    });

  /* --------------------------------------------------------------- */
  return (
    <div className="bg-black/40 border border-white/20 mb-2">
      {/* ---------- header ----------------------------------------- */}
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer select-none"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-2">
          {/* Name field */}
          {editable ? (
            <input
              className="bg-transparent outline-none"
              placeholder="Name…"
              value={item.title}
              onChange={(e) => patch({ title: e.target.value })}
            />
          ) : (
            <span>{item.title || <em className="opacity-50">Untitled</em>}</span>
          )}

          {/* Gear suits */}
          {item.type === 'gear' && (
            <span>
              {SUITS.map((s) => {
                const active = item.suits.includes(s);
                const color =
                  active && (s === '♥' || s === '♦') ? 'text-red-500' : 'text-white';
                return (
                  <span
                    key={s}
                    className={`mx-0.5 ${active ? color : 'opacity-20'}`}
                  >
                    {s}
                  </span>
                );
              })}
            </span>
          )}

          {/* Weapon skill + mark */}
          {item.type === 'weapon' && (
            <span
              className={`text-xs flex items-center gap-1 ${
                editable ? 'cursor-pointer' : ''
              }`}
              title="Cycle mark"
              onClick={editable ? advanceMark : undefined}
            >
              ({item.skill || <em className="opacity-50">Skill</em>}
              {item.skillMark && ` ${item.skillMark}`})
            </span>
          )}
        </div>

        <span>{open ? '▾' : '▸'}</span>
      </div>

      {/* ---------- body ------------------------------------------- */}
      {open && (
        <div className="px-3 pb-3">
          {/* ITEM --------------------------------------------------- */}
          {item.type === 'item' && (
            <textarea
              className="w-full bg-transparent outline-none resize-none"
              rows={3}
              placeholder="Description…"
              value={item.text}
              readOnly={!editable}
              onChange={(e) => patch({ text: e.target.value })}
            />
          )}

          {/* GEAR --------------------------------------------------- */}
          {item.type === 'gear' && (
            <>
              {/* suit picker */}
              {editable && (
                <div className="mb-2">
                  {SUITS.map((s) => {
                    const active = item.suits.includes(s);
                    const color =
                      active && (s === '♥' || s === '♦')
                        ? 'text-red-500'
                        : 'text-white';
                    return (
                      <button
                        key={s}
                        className={`mx-0.5 ${
                          active ? color : 'opacity-20'
                        }`}
                        onClick={() => toggleSuit(s)}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* properties & abilities */}
              <label className="text-xs opacity-70">Properties</label>
              <textarea
                className="w-full bg-transparent outline-none resize-none mb-3"
                rows={2}
                placeholder="Properties…"
                value={item.properties}
                readOnly={!editable}
                onChange={(e) => patch({ properties: e.target.value })}
              />

              <label className="text-xs opacity-70">Abilities</label>
              <textarea
                className="w-full bg-transparent outline-none resize-none"
                rows={2}
                placeholder="Abilities…"
                value={item.abilities}
                readOnly={!editable}
                onChange={(e) => patch({ abilities: e.target.value })}
              />
            </>
          )}

          {/* WEAPON ------------------------------------------------- */}
          {item.type === 'weapon' && (
            <>
              {/* Skill input stays in header; here we show range + properties */}
              {editable && (
                <select
                  className="bg-black/60 mb-2 px-2 py-1 rounded border border-white/20"
                  value={item.range}
                  onChange={(e) => patch({ range: e.target.value })}
                >
                  {WEAPON_RANGES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              )}
              {!editable && <p className="text-xs mb-2">{item.range}</p>}

              {/* Properties line */}
              <label className="text-xs opacity-70">Properties</label>
              <textarea
                className="w-full bg-transparent outline-none resize-none mb-3"
                rows={2}
                placeholder="Properties…"
                value={item.properties}
                readOnly={!editable}
                onChange={(e) => patch({ properties: e.target.value })}
              />

              {/* Injury block */}
              <div className="space-y-2">
                <input
                  className="w-full bg-transparent outline-none"
                  value={item.injuryName}
                  readOnly={!editable}
                  placeholder="Injury name…"
                  onChange={(e) => patch({ injuryName: e.target.value })}
                />

                {['treatment', 'effect', 'cure'].map((f) => (
                  <textarea
                    key={f}
                    className="w-full bg-transparent outline-none resize-none"
                    rows={2}
                    placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                    value={item[f]}
                    readOnly={!editable}
                    onChange={(e) => patch({ [f]: e.target.value })}
                  />
                ))}
              </div>
            </>
          )}

          {/* delete button */}
          {editable && (
            <button
              className="mt-4 text-xs text-red-400 hover:text-red-200"
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
