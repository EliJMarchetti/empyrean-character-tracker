import { useState } from 'react';
import AttributeBox   from './components/AttributeBox';
import SkillRow       from './components/SkillRow';
import CardList       from './components/CardList';
import InventoryList  from './components/InventoryList';
import InjuryPanel    from './components/InjuryPanel';

import CharacterProvider, { useCharacter } from './context/CharacterContext';
import InjuryProvider    from './context/InjuryContext';

/* helper to show the dropdown */
function CharacterSelect() {
  const { names, current, setCurrent, create } = useCharacter();

  const handle = e => {
    if (e.target.value === '__new') {
      const name = prompt('New character name?');
      if (name && !names.includes(name)) create(name);
    } else {
      setCurrent(e.target.value);
    }
  };

  return (
    <select
      className="bg-black/60 px-3 py-2 rounded border border-white/20"
      value={current}
      onChange={handle}
    >
      {names.map(n => (
        <option key={n} value={n}>{n}</option>
      ))}
      <option value="__new">＋ New Character…</option>
    </select>
  );
}

/* slug helper */
const slug = str => str.trim().replace(/\s+/g, '_');

export default function App() {
  const [editable, setEditable] = useState(false);

  return (
    <CharacterProvider>
      <InnerApp editable={editable} setEditable={setEditable} />
    </CharacterProvider>
  );
}

/* everything you already had, but reads current character */
function InnerApp({ editable, setEditable }) {
  const { current } = useCharacter();
  const pre = slug(current) + '-';       // "Alice-" etc.

  return (
    <InjuryProvider prefix={`${pre}injuries`}>
      <div className="flex">
        {/* LEFT column */}
        <div className="w-5/6 relative min-h-screen overflow-x-hidden">
          <img
            src="./background.jpeg"
            alt="Empyrean background"
            className="fixed inset-0 w-full h-full object-cover z-[-1]"
          />

          {/* header */}
          <header className="fixed top-0 left-0 w-5/6 h-16 z-10 flex items-center justify-between px-6 backdrop-blur-sm fixed-ui-bg bg-left bg-top bg-fixed">
            <h1 className="text-2xl whitespace-nowrap">
              Character: <span className="font-bold">{current}</span>
            </h1>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setEditable(e => !e)}
                className={`bg-black/60 px-3 py-2 rounded border ${
                  editable ? 'border-white' : 'border-white/20'
                } transition-colors`}
              >
                Edit Character
              </button>

              <CharacterSelect />
            </div>
          </header>

          {/* sheet */}
          <div className="pt-24">
            {/* Attributes */}
            <section className="grid grid-cols-5 gap-4 p-6">
              {[
                { id: 'might',  label: 'Might'  },
                { id: 'reflex', label: 'Reflex' },
                { id: 'wits',   label: 'Wits'   },
                { id: 'charm',  label: 'Charm'  },
                { id: 'spirit', label: 'Spirit' },
              ].map(attr => (
                <AttributeBox key={attr.id} {...attr} editable={editable} />
              ))}
            </section>

            {/* Skills */}
            <section className="grid grid-cols-3 gap-4 px-6 pb-10">
              {[
                [
                  { id: 'strength',     label: 'Strength'     },
                  { id: 'celerity',     label: 'Celerity'     },
                  { id: 'coordination', label: 'Coordination' },
                  { id: 'endurance',    label: 'Endurance'    },
                  { id: 'craft',        label: 'Craft'        },
                ],
                [
                  { id: 'reason',      label: 'Reason'      },
                  { id: 'awareness',   label: 'Awareness'   },
                  { id: 'information', label: 'Information' },
                  { id: 'composure',   label: 'Composure'   },
                  { id: 'systems',     label: 'Systems'     },
                ],
                [
                  { id: 'presence',    label: 'Presence'     },
                  { id: 'intuition',   label: 'Intuition'    },
                  { id: 'manipulation',label: 'Manipulation' },
                  { id: 'discipline',  label: 'Discipline'   },
                  { id: 'anima',       label: 'Anima'        },
                ],
              ].map((col, i) => (
                <div key={i} className="bg-black/40">
                  {col.map(s => (
                    <SkillRow key={s.id} {...s} editable={editable} />
                  ))}
                </div>
              ))}
            </section>

            {/* Specializations / Talents / Perks */}
            <CardList
              title="Specializations"
              keyPrefix={`${pre}specs`}
              editable={editable}
              showSpecSkills={true}
            />

            <CardList
              title="Talents"
              keyPrefix={`${pre}talents`}
              editable={editable}
              showSkill={true}
            />

            <CardList
              title="Perks"
              keyPrefix={`${pre}perks`}
              editable={editable}
            />

            {/* Inventory */}
            <InventoryList editable={editable} storageKey={`${pre}inventory`} />
          </div>
        </div>

        {/* RIGHT column */}
        <InjuryPanel prefix={`${pre}injuries`} />
      </div>
    </InjuryProvider>
  );
}
