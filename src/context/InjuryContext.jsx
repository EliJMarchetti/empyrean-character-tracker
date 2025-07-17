import { createContext, useContext, useState, useEffect } from 'react';

/* give every component easy access to injuries */
const InjuryCtx = createContext();
export const useInjuries = () => useContext(InjuryCtx);

export default function InjuryProvider({ children }) {
  /* load from localStorage once */
  const [injuries, setInjuries] = useState(() => {
    const raw = localStorage.getItem('injuries');
    return raw ? JSON.parse(raw) : [];
  });

  /* save whenever injuries change */
  useEffect(() => {
    localStorage.setItem('injuries', JSON.stringify(injuries));
  }, [injuries]);

  /* handy functions */
  const add    = (i)           => setInjuries([...injuries, i]);
  const update = (id, patch)   =>
      setInjuries(injuries.map(i => (i.id === id ? { ...i, ...patch } : i)));
  const remove = (id)          => setInjuries(injuries.filter(i => i.id !== id));

  return (
    <InjuryCtx.Provider value={{ injuries, add, update, remove }}>
      {children}
    </InjuryCtx.Provider>
  );
}
