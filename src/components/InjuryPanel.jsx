import { useState } from 'react';
import { useInjuries } from '../context/InjuryContext';

const SLOT_MAX = 5;
const HEADER_H = 64;   // px (matches main header)

export default function InjuryPanel() {
  const { injuries, add, update, remove } = useInjuries();
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({
    name: '', severity: 1, effect: '', treatment: '', cure: '',
  });

  /* total filled slots */
  const filled = injuries.reduce((s, i) => s + Number(i.severity), 0);

  /* ---------- death modal ---------- */
  if (filled > SLOT_MAX) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40">
        <div className="bg-black/90 border border-white/20 p-6 text-center space-y-4">
          <h2 className="text-2xl">You Died</h2>
          <button
            className="px-3 py-1 border border-white/40 hover:border-white"
            onClick={() => remove(injuries[injuries.length - 1].id)}
          >
            Return
          </button>
          <button
            className="px-3 py-1 border border-red-400 hover:border-red-200"
            onClick={() => localStorage.clear() || location.reload()}
          >
            Delete Character
          </button>
        </div>
      </div>
    );
  }

  /* ---------- add new injury ---------- */
  const saveDraft = () => {
    add({ id: Date.now(), ...draft, treated: false });
    setDraft({ name: '', severity: 1, effect: '', treatment: '', cure: '' });
    setShowForm(false);
  };

  return (
    <aside className="fixed top-0 right-0 w-1/6 h-screen flex flex-col z-10 fixed-ui-bg backdrop-blur-sm border-l border-white/20">

      {/* header (64 px tall like main header) */}
      <div className="h-16 flex items-center justify-center border-b border-white/20">
        <h2 className="text-lg">Injuries</h2>
      </div>

      {/* list area with slot overlay */}
      <div className="relative flex-1 overflow-y-auto">
        {/* 4 lines = 5 equal slots (start below header) */}
        {[1,2,3,4].map(n => (
          <div
            key={n}
            className="absolute left-0 right-0 border-t border-white/20"
            style={{ top: `calc(${n} * (100% / 5))` }}
          />
        ))}

        {injuries.map(i => (
          <div
            key={i.id}
            className={`p-2 text-xs overflow-y-auto ${
              i.treated ? 'bg-gray-800 border-gray-400' : 'bg-black/40 border-red-400'
            } border`}
            style={{ height: `calc(100% / 5 * ${i.severity})` }}
          >
            <span className="block mb-1">{i.name}</span>
            {!i.treated && <p className="mb-1">{i.effect}</p>}

            <label className="flex items-center gap-1 mb-1">
              <input
                type="checkbox"
                checked={i.treated}
                onChange={e => update(i.id, { treated: e.target.checked })}
              />
              Treated
            </label>

            <label className="flex items-center gap-1 opacity-80">
              <input
                type="checkbox"
                disabled={!i.treated}
                onChange={() => remove(i.id)}
              />
              Cure applied
            </label>
          </div>
        ))}
      </div>

      {/* footer mirrors header height */}
      <div className="h-16 border-t border-white/20 flex items-center justify-center">
        <button
          className="bg-black/60 px-4 py-1 border border-white/30 hover:border-white"
          onClick={() => setShowForm(true)}
        >
          Add Injury
        </button>
      </div>

      {/* pop-up form */}
      {showForm && (
        <div className="h-16 flex items-center justify-center border-b border-white/20 fixed-ui-bg bg-left bg-top bg-fixed">
          <input
            className="w-full bg-transparent outline-none"
            placeholder="Name…"
            value={draft.name}
            onChange={e => setDraft({ ...draft, name: e.target.value })}
          />

          <select
            className="w-full bg-black/60"
            value={draft.severity}
            onChange={e => setDraft({ ...draft, severity: Number(e.target.value) })}
          >
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>

          <textarea
            className="w-full bg-transparent outline-none resize-none" rows={2}
            placeholder="Effect…"
            value={draft.effect}
            onChange={e => setDraft({ ...draft, effect: e.target.value })}
          />
          <textarea
            className="w-full bg-transparent outline-none resize-none" rows={2}
            placeholder="Treatment…"
            value={draft.treatment}
            onChange={e => setDraft({ ...draft, treatment: e.target.value })}
          />
          <textarea
            className="w-full bg-transparent outline-none resize-none" rows={2}
            placeholder="Cure…"
            value={draft.cure}
            onChange={e => setDraft({ ...draft, cure: e.target.value })}
          />

          <button
            className="w-full bg-black/60 border border-white/40 py-1 hover:border-white"
            onClick={saveDraft}
          >
            Save Injury
          </button>
        </div>
      )}
    </aside>
  );
}
