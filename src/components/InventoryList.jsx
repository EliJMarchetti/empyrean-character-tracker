import { useState, useEffect } from 'react';
import InventoryCard from './InventoryCard';

const DEFAULT_ITEM = type => ({
  id: Date.now(),
  type,
  title: '',
  /* common */ text: '',
  /* gear */ suits: [],
  properties: '',
  abilities: '',
  /* weapon */ skill: '',
  range: 'Melee',
  injuryName: '',
  treatment: '',
  effect: '',
  cure: '',
});

export default function InventoryList({ editable, storageKey = 'inventory' }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  const add    = type      => setItems([...items, DEFAULT_ITEM(type)]);
  const update = (id, patch) =>
      setItems(items.map(it => (it.id === id ? patch : it)));
  const del    = id        => setItems(items.filter(it => it.id !== id));

  return (
    <section className="px-6 pb-10">
      <h2 className="mb-2">Inventory</h2>

      {items.map(it => (
        <InventoryCard
          key={it.id}
          item={it}
          editable={editable}
          onChange={updated => update(it.id, updated)}
          onDelete={() => del(it.id)}
        />
      ))}

      {editable && (
        <div className="flex gap-2 mt-2">
          {['item', 'gear', 'weapon'].map(t => (
            <button
              key={t}
              className="text-xs bg-black/60 px-2 py-1 border border-white/20 hover:border-white capitalize"
              onClick={() => add(t)}
            >
              ＋ {t}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
