import { useState } from 'react';

const SUITS = [
  { icon: '♥', word: 'Toughness' },
  { icon: '♣', word: 'Interposition' },
  { icon: '♦', word: 'Armor' },
  { icon: '♠', word: 'Counterattack' },
];

const WEAPON_RANGES = ['Melee', 'Ranged', 'Long Ranged'];
const MARKS = ['', '+', '++', '–', '––'];

/* helper: suit color class */
const suitClass = (icon, active) => {
  if (!active) return 'opacity-20';
  return icon === '♥' || icon === '♦' ? 'text-red-500' : 'text-black';
};

export default function InventoryCard({ item, editable, onChange, onDelete }) {
  const [open, setOpen] = useState(false);
  const patch = p => onChange({ ...item, ...p });

  /* ---- helpers --------------------------------------------------- */
  const toggleSuit = icon =>
    patch({ suit: item.suit === icon ? '' : icon });

  const nextMark = () =>
    patch({
      skillMark: MARKS[(MARKS.indexOf(item.skillMark || '') + 1) % MARKS.length],
    });

  /* --------------------------------------------------------------- */
  return (
    <div className="bg-black/40 border border-white/20 mb-2">
      {/* ------------ header --------------------------------------- */}
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer select-none"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2">
          {/* title */}
          {editable ? (
            <input
              className="bg-transparent outline-none"
              placeholder="Name…"
              value={item.title}
              onChange={e => patch({ title: e.target.value })}
            />
          ) : (
            <span>{item.title || <em className="opacity-50">Untitled</em>}</span>
          )}

          {/* Gear suit display */}
          {item.type === 'gear' && item.suit && (
            <span className="ml-1">
              {item.suit}{' '}
              {SUITS.find(s => s.icon === item.suit)?.word}
            </span>
          )}

          {/* Weapon skill + mark – only when NOT editing */}
          {item.type === 'weapon' && !editable && (
            <span className="text-xs ml-1">
              ({item.skill || <em className="opacity-50">Skill</em>}
              {item.skillMark && ` ${item.skillMark}`})
            </span>
          )}
        </div>

        <span>{open ? '▾' : '▸'}</span>
      </div>

      {/* ------------ body ----------------------------------------- */}
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
              onChange={e => patch({ text: e.target.value })}
            />
          )}

          {/* GEAR --------------------------------------------------- */}
          {item.type === 'gear' && (
            <>
              {/* suit picker */}
              {editable && (
                <div className="mb-2 flex gap-1">
                  {SUITS.map(s => (
                    <button
                      key={s.icon}
                      className={`px-2 ${suitClass(s.icon, item.suit === s.icon)}`}
                      onClick={() => toggleSuit(s.icon)}
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>
              )}

              <label className="text-xs opacity-70">Properties</label>
              <textarea
                className="w-full bg-transparent outline-none resize-none mb-3"
                rows={2}
                placeholder="Properties…"
                value={item.properties}
                readOnly={!editable}
                onChange={e => patch({ properties: e.target.value })}
              />

              <label className="text-xs opacity-70">Abilities</label>
              <textarea
                className="w-full bg-transparent outline-none resize-none"
                rows={2}
                placeholder="Abilities…"
                value={item.abilities}
                readOnly={!editable}
                onChange={e => patch({ abilities: e.target.value })}
              />
            </>
          )}

          {/* WEAPON ------------------------------------------------- */}
          {item.type === 'weapon' && (
            <>
              {/* range selector */}
              {editable ? (
                <select
                  className="bg-black/60 mb-2 px-2 py-1 rounded border border-white/20"
                  value={item.range}
                  onChange={e => patch({ range: e.target.value })}
                >
                  {WEAPON_RANGES.map(r => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              ) : (
                <p className="text-xs mb-2">{item.range}</p>
              )}

              {/* skill + mark editor (only visible while editing) */}
              {editable && (
                <div className="flex gap-2 mb-2">
                  <input
                    className="flex-1 bg-transparent outline-none border-b border-white/30"
                    placeholder="Skill…"
                    value={item.skill}
                    onChange={e => patch({ skill: e.target.value })}
                  />
                  <button
                    className="px-2 border border-white/30"
                    onClick={nextMark}
                  >
                    {item.skillMark || '±'}
                  </button>
                </div>
              )}

              {/* properties */}
              <label className="text-xs opacity-70">Properties</label>
              <textarea
                className="w-full bg-transparent outline-none resize-none mb-3"
                rows={2}
                placeholder="Properties…"
                value={item.properties}
                readOnly={!editable}
                onChange={e => patch({ properties: e.target.value })}
              />

              {/* Injury block */}
              <div className="space-y-2">
                <input
                  className="w-full bg-transparent outline-none"
                  value={item.injuryName}
                  readOnly={!editable}
                  placeholder="Injury name…"
                  onChange={e => patch({ injuryName: e.target.value })}
                />

                {['effect', 'treatment', 'cure'].map(f => (
                  <textarea
                    key={f}
                    className="w-full bg-transparent outline-none resize-none"
                    rows={2}
                    placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                    value={item[f]}
                    readOnly={!editable}
                    onChange={e => patch({ [f]: e.target.value })}
                  />
                ))}
              </div>
            </>
          )}

          {/* delete */}
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
