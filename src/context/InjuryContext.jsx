import { createContext, useContext, useState, useEffect } from 'react';

/* easy access */
const InjuryCtx = createContext();
export const useInjuries = () => useContext(InjuryCtx);

/* prefix lets each character have its own injury list */
export default function InjuryProvider({ children, prefix = 'injuries' }) {
  /* load once */
  const [injuries, setInjuries] = useState(() => {
    const raw = localStorage.getItem(prefix);
    return raw ? JSON.parse(raw) : [];
  });

  /* save on every change */
  useEffect(() => {
    localStorage.setItem(prefix, JSON.stringify(injuries));
  }, [injuries, prefix]);

  /* helpers */
  const add    = i          => setInjuries([...injuries, i]);
  const update = (id, p)    =>
      setInjuries(injuries.map(it => (it.id === id ? { ...it, ...p } : it)));
  const remove = id         => setInjuries(injuries.filter(it => it.id !== id));

  return (
    <InjuryCtx.Provider value={{ injuries, add, update, remove }}>
      {children}
    </InjuryCtx.Provider>
  );
}
