import { useState } from 'react';
import { useInjuries } from '../context/InjuryContext';

const SLOT_MAX = 5;

export default function InjuryPanel({ storageKey = 'injuries' }) {
  const { injuries, add, update, remove } = useInjuries(storageKey);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({
    name: '', severity: 1, effect: '', treatment: '', cure: '',
  });

  /* total filled slots */
  const filled = injuries.reduce((s, i) => s + Number(i.severity), 0);

  /* ── Death modal ───────────────────────────── */
  if (filled > SLOT_MAX) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40">
        <div className="bg-black/90 text-white border border-white/20 p-6 text-center space-y-4">
          <h2 className="text-2xl mb-2">You Died</h2>
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
            Delete Character
          </button>
        </div>
      </div>
    );
  }

  /* save new injury */
  const saveDraft = () => {
    add({ id: Date.now(), ...draft, treated: false });
    setDraft({ name: '', severity: 1, effect: '', treatment: '', cure: '' });
    setShowForm(false);
  };

  return (
    <aside className="fixed top-0 right-0 w-1/6 h-screen flex flex-col z-10 fixed-ui-bg bg-left bg-top bg-fixed backdrop-blur-sm border-l border-white/20">

      {/* header (64 px tall, centred) */}
      <div className="h-16 flex items-center justify-center border-b border-white/20">
        <h2 className="text-lg">Injuries</h2>
      </div>

      {/* 4 faint grid lines (5 equal slots) */}
      <div className="absolute inset-x-0 top-16 bottom-16 pointer-events-none">
        {[1,2,3,4].map(n => (
          <div
            key={n}
            className="absolute left-0 right-0 border-t border-white/20"
            style={{ top: `${(100 / 5) * n}%` }}
          />
        ))}
      </div>

      {/* list area */}
      <div className="flex-1 overflow-y-auto">
        {injuries.map(i => (
          <div
            key={i.id}
            className={`p-2 text-xs overflow-y-auto border ${
              i.treated ? 'bg-gray-800 border-gray-400' : 'bg-black/40 border-red-400'
            }`}
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
              Cure applied
            </label>
          </div>
        ))}
      </div>

      {/* footer (mirrors header height) */}
      <div className="h-16 border-t border-white/20 flex items-center justify-center">
        <button
          className="bg-black/60 px-4 py-1 border border-white/30 hover:border-white"
          onClick={() => setShowForm(true)}
        >
          Add Injury
        </button>
      </div>

      {/* centered Add‑Injury dialog */}
      {showForm && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
          <div className="w-5/6 max-w-md bg-black/90 p-4 space-y-2 overflow-y-auto border border-white/20">
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
              Save Injury
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
