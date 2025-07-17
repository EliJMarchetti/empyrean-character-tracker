import { createContext, useContext, useState, useEffect } from 'react';

/* helper to slug‑ify names for storage keys */
const slug = str => str.trim().replace(/\s+/g, '_');

const Ctx = createContext();
export const useCharacter = () => useContext(Ctx);

export default function CharacterProvider({ children }) {
  const [names, setNames] = useState(() => {
    const raw = localStorage.getItem('charNames');
    return raw ? JSON.parse(raw) : ['Default'];
  });

  const [current, setCurrent] = useState(() => {
    return localStorage.getItem('currentChar') || names[0];
  });

  /* keep lists in localStorage */
  useEffect(() => {
    localStorage.setItem('charNames', JSON.stringify(names));
  }, [names]);

  useEffect(() => {
    localStorage.setItem('currentChar', current);
  }, [current]);

  const create = name => {
    if (!names.includes(name)) setNames([...names, name]);
    setCurrent(name);
  };

  return (
    <Ctx.Provider value={{ names, current, slug, create, setCurrent }}>
      {children}
    </Ctx.Provider>
  );
}
