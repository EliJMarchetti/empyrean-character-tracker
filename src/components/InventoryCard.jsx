import { useState } from 'react';

const SUITS = ['♥', '♣', '♦', '♠'];
const WEAPON_RANGES = ['Melee', 'Ranged', 'Long Ranged'];

export default function InventoryCard({ item, editable, onChange, onDelete }) {
  const [open, setOpen] = useState(false);

  /* helpers */
  const patch = p => onChange({ ...item, ...p });

  /* suit toggle for Gear */
  const toggleSuit = s =>
    patch({
      suits: item.suits.includes(s)
        ? item.suits.filter(x => x !== s)
        : [...item.suits, s],
    });

  return (
    <div className="bg-black/40 border border-white/20 mb-2">
      {/* header */}
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer select-none"
        onClick={() => setOpen(o => !o)}
      >
        {/* left side */}
        <div className="flex items-center gap-2">
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

          {/* header badges */}
          {item.type === 'gear' && (
            <span>
              {SUITS.map(s => (
                <span
                  key={s}
                  className={`mx-0.5 ${
                    item.suits.includes(s) ? '' : 'opacity-20'
                  }`}
                >
                  {s}
                </span>
              ))}
            </span>
          )}

          {item.type === 'weapon' && item.skill && (
            <span className="text-xs opacity-70">({item.skill})</span>
          )}
        </div>

        <span>{open ? '▾' : '▸'}</span>
      </div>

      {/* body */}
      {open && (
        <div className="px-3 pb-3">
          {/* TYPE‑SPECIFIC FIELDS */}
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

          {item.type === 'gear' && (
            <>
              {/* suit picker */}
              {editable && (
                <div className="mb-2">
                  {SUITS.map(s => (
                    <button
                      key={s}
                      className={`mx-0.5 ${
                        item.suits.includes(s) ? '' : 'opacity-20'
                      }`}
                      onClick={() => toggleSuit(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <label className="text-xs opacity-70">Properties</label>
              <textarea
                className="w-full bg-transparent outline-none resize-none mb-2"
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

          {item.type === 'weapon' && (
            <>
              {/* skill + range */}
              {editable ? (
                <input
                  className="bg-transparent outline-none mb-1"
                  placeholder="Associated Skill…"
                  value={item.skill}
                  onChange={e => patch({ skill: e.target.value })}
                />
              ) : (
                <p className="text-xs opacity-70 mb-1">{item.skill}</p>
              )}

              {editable && (
                <select
                  className="bg-black/60 mb-2 px-2 py-1 rounded border border-white/20"
                  value={item.range}
                  onChange={e => patch({ range: e.target.value })}
                >
                  {WEAPON_RANGES.map(r => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              )}
              {!editable && <p className="text-xs mb-2">{item.range}</p>}

              {/* Injury block */}
              <label className="text-xs opacity-70">Injury Name</label>
              <input
                className="w-full bg-transparent outline-none mb-1"
                value={item.injuryName}
                readOnly={!editable}
                placeholder="e.g. Deep Cut"
                onChange={e => patch({ injuryName: e.target.value })}
              />

              {['Treatment', 'Effect', 'Cure'].map(f => (
                <textarea
                  key={f}
                  className="w-full bg-transparent outline-none resize-none mb-2"
                  rows={2}
                  placeholder={f}
                  value={item[f.toLowerCase()]}
                  readOnly={!editable}
                  onChange={e => patch({ [f.toLowerCase()]: e.target.value })}
                />
              ))}
            </>
          )}

          {/* delete */}
          {editable && (
            <button
              className="text-xs text-red-400 hover:text-red-200"
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
