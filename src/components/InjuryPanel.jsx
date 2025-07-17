import { useState } from 'react';
import { useInjuries } from '../context/InjuryContext';

const SLOT_MAX = 5;

export default function InjuryPanel() {
  const { injuries, add, update, remove } = useInjuries();
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({
    name: '',
    severity: 1,
    effect: '',
    treatment: '',
    cure: '',
  });

  /* total filled slots */
  const filled = injuries.reduce((s, i) => s + Number(i.severity), 0);

  /* ---------- death modal ---------- */
  if (filled > SLOT_MAX) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40">
        <div className="bg-black/90 border border-white/20 p-6 text-center space-y-4">
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

  /* save a new injury */
  const saveDraft = () => {
    add({ id: Date.now(), ...draft, treated: false });
    setDraft({ name: '', severity: 1, effect: '', treatment: '', cure: '' });
    setShowForm(false);
  };

  return (
    <aside className="fixed top-0 right-0 w-1/6 h-screen border-l border-white/20 flex flex-col z-10 fixed-ui-bg backdrop-blur-sm">

      {/* header (same height as page header) */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-white/20">
        <h2>Injuries</h2>
      </div>

      {/* horizontal grid lines (4) for 5 equal slots */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3, 4].map(n => (
          <div
            key={n}
            className="absolute left-0 right-0 border-t border-white/20"
            style={{ top: `${(100 / 5) * n}%` }}
          />
        ))}
      </div>

      {/* scrolling list (flex column) */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {injuries.map(i => (
          <div
            key={i.id}
            style={{ height: `calc(100% / 5 * ${i.severity})` }}
            className={`border p-1 text-xs space-y-1 overflow-y-auto ${
              i.treated
                ? 'border-gray-400 bg-gray-800'
                : 'border-red-400 bg-black/40'
            }`}
          >
            <span>{i.name}</span>
            {!i.treated && <p>{i.effect}</p>}

            {/* Treated checkbox */}
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={i.treated}
                onChange={e => update(i.id, { treated: e.target.checked })}
              />
              Treated
            </label>

            {/* Cure checkbox: disabled until Treated */}
            <label className="flex items-center gap-1 opacity-70">
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

      {/* footer divider */}
      <div className="border-t border-white/20"></div>

      {/* Add Injury button (always active) */}
      <button
        className="w-full bg-black/60 py-2 border-t border-white/20 hover:bg-black/70"
        onClick={() => setShowForm(true)}
      >
        Add Injury
      </button>

      {/* pop‑up form */}
      {showForm && (
        <div className="absolute inset-0 bg-black/90 p-4 space-y-2 overflow-y-auto">
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
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
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
      )}
    </aside>
  );
}
