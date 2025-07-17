import { useState, useEffect } from 'react';
import InventoryCard from './InventoryCard';

const DEFAULT_ITEM = type => {
  const base = {
    id: Date.now(),
    type,
    title: '',
    text: '',
  };

  if (type === 'gear') {
    return { ...base, suit: '', properties: '', abilities: '' };
  }
  if (type === 'weapon') {
    return {
      ...base,
      skill: '',
      skillMark: '',
      range: 'Melee',
      properties: '',
      injuryName: '',
      effect: '',
      treatment: '',
      cure: '',
    };
  }
  if (type === 'augment') {
    return {
      ...base,
      bioTech: 'Biological',
      subType: 'Gene Editing ⚛',
    };
  }

  /* item */
  return base;
};

/**
 * @param {object} props
 * @param {'inventory' | 'augment'} [props.mode]  - which buttons & heading
 * @param {string} props.storageKey               - localStorage key
 * @param {boolean} props.editable
 */
export default function InventoryList({
  editable,
  storageKey = 'inventory',
  mode = 'inventory',
}) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  const add    = type      => setItems([...items, DEFAULT_ITEM(type)]);
  const update = (id, p)   => setItems(items.map(it => (it.id === id ? p : it)));
  const del    = id        => setItems(items.filter(it => it.id !== id));

  /* which buttons to show */
  const buttons =
    mode === 'inventory' ? ['item', 'gear', 'weapon'] : ['augment'];

  const heading = mode === 'inventory' ? 'Inventory' : 'Augments';

  return (
    <section className="px-6 pb-10">
      <h2 className="mb-2">{heading}</h2>

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
          {buttons.map(t => (
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
