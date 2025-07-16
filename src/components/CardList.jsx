import { useState, useEffect } from 'react';
import Card from './Card';

/**
 * Generic list wrapper persisted under localStorage key `keyPrefix`.
 *
 * Additional props:
 *  - showSkill       (boolean)  → pass to Card for Talents
 *  - showSpecSkills  (boolean)  → pass to Card for Specializations
 */
export default function CardList({
  title,
  keyPrefix,
  editable,
  showSkill = false,
  showSpecSkills = false,
}) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem(keyPrefix);
    return raw ? JSON.parse(raw) : [];
  });

  /* persist whenever items change */
  useEffect(() => {
    localStorage.setItem(keyPrefix, JSON.stringify(items));
  }, [items, keyPrefix]);

  /* helpers */
  const addItem = () =>
    setItems([
      ...items,
      { id: Date.now(), title: '', body: '', skill: '', specSkills: [] },
    ]);

  const updateItem = (id, patch) =>
    setItems(items.map(it => (it.id === id ? { ...it, ...patch } : it)));

  const deleteItem = id => setItems(items.filter(it => it.id !== id));

  return (
    <section className="px-6 pb-10">
      <h2 className="mb-2">{title}</h2>

      {items.map(it => (
        <Card
          key={it.id}
          title={it.title}
          body={it.body}
          skill={it.skill}
          specSkills={it.specSkills}
          showSkill={showSkill}
          showSpecSkills={showSpecSkills}
          editable={editable}
          onChange={patch => updateItem(it.id, patch)}
          onDelete={() => deleteItem(it.id)}
        />
      ))}

      {editable && (
        <button
          className="mt-1 text-sm bg-black/60 px-2 py-1 border border-white/20 hover:border-white"
          onClick={addItem}
        >
          ＋ Add {title.slice(0, -1)}
        </button>
      )}
    </section>
  );
}
