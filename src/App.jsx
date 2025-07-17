import { useState } from 'react';
import AttributeBox   from './components/AttributeBox';
import SkillRow       from './components/SkillRow';
import CardList       from './components/CardList';
import InventoryList  from './components/InventoryList';
import InjuryProvider from './context/InjuryContext';
import InjuryPanel    from './components/InjuryPanel';

export default function App() {
  const [editable, setEditable] = useState(false);

  return (
    <InjuryProvider>
      <div className="flex">
        {/* LEFT: main sheet (5/6 width) */}
        <div className="w-5/6 relative min-h-screen overflow-x-hidden">
          <img
            src="./background.jpeg"
            alt="Empyrean background"
            className="fixed inset-0 w-full h-full object-cover z-[-1]"
          />

          {/* sticky header, now with steel bg */}
          <header className="fixed top-0 left-0 w-5/6 h-16 z-10 flex items-center justify-between px-6 backdrop-blur-sm fixed-ui-bg bg-left bg-top bg-fixed">
            <h1 className="text-2xl whitespace-nowrap">
              Character:&nbsp;<span className="font-bold">PENDING</span>
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

              <select className="bg-black/60 px-3 py-2 rounded border border-white/20">
                <option value="">New / Load…</option>
              </select>
            </div>
          </header>

          {/* content */}
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

            {/* Card lists */}
            <CardList
              title="Specializations"
              keyPrefix="specs"
              editable={editable}
              showSpecSkills={true}
            />

            <CardList
              title="Talents"
              keyPrefix="talents"
              editable={editable}
              showSkill={true}
            />

            <CardList
              title="Perks"
              keyPrefix="perks"
              editable={editable}
            />

            {/* Inventory */}
            <InventoryList editable={editable} />
          </div>
        </div>

        {/* RIGHT: anchored panel (1/6) */}
        <InjuryPanel />
      </div>
    </InjuryProvider>
  );
}
