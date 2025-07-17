import { useState } from 'react';
import { useInjuries } from '../context/InjuryContext';

/* simple constants */
const SLOT_MAX = 5;

export default function InjuryPanel({ editable }) {
  const { injuries, add, update, remove } = useInjuries();
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({
    name: '', severity: 1, effect: '', treatment: '', cure: '',
  });

  /* how many of the 5 slots are filled? */
  const filled = injuries.reduce((s, i) => s + Number(i.severity), 0);

  /* if >5 we show a “You Died” modal */
  if (filled > SLOT_MAX) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40">
        <div className="bg-black/90 border border-white/20 p-6 text-center space-y-4">
          <h2 className="text-2xl">You Died</h2>
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

  /* save new injury from the mini form */
  const saveDraft = () => {
    add({ id: Date.now(), ...draft, treated: false });
    setDraft({ name: '', severity: 1, effect: '', treatment: '', cure: '' });
    setShowForm(false);
  };

  return (
    <aside className="fixed top-0 right-0 w-1/6 h-screen bg-black/60 backdrop-blur-sm border-l border-white/20 flex flex-col z-10">

      <h2 className="text-center py-2 border-b border-white/20">Injuries</h2>

      {/* list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {injuries.map(i => (
          <div
            key={i.id}
            className={`border ${
              i.treated ? 'border-gray-400 bg-gray-800' : 'border-red-400'
            } p-1 text-xs space-y-1`}
          >
            <div className="flex justify-between">
              <span>{i.name} <span className="opacity-60">S{i.severity}</span></span>
              {editable && (
                <button onClick={() => remove(i.id)} className="opacity-60">✕</button>
              )}
            </div>

            {!i.treated && <p>{i.effect}</p>}

            {editable && (
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={i.treated}
                  onChange={e => update(i.id, { treated: e.target.checked })}
                />
                Treated
              </label>
            )}

            {i.treated && (
              <label className="flex items-center gap-1">
                <input type="checkbox" onChange={() => remove(i.id)} />
                Cure applied
              </label>
            )}
          </div>
        ))}
      </div>

      {/* floating heart to open form */}
      {editable && (
        <button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl"
          onClick={() => setShowForm(true)}
        >
          ❤️
        </button>
      )}

      {/* simple add‑injury form */}
      {showForm && editable && (
        <div className="absolute inset-0 bg-black/90 p-4 space-y-2">
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
            {[1,2,3,4,5].map(n => <option key={n}>Severity {n}</option>)}
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
