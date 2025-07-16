import { useState }  from 'react';
import AttributeBox  from './components/AttributeBox';
import SkillRow      from './components/SkillRow';

export default function App() {
  const [editable, setEditable] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img
        src="./background.jpeg"
        alt="Empyrean background"
        className="fixed inset-0 w-full h-full object-cover z-[-1]"
      />

      {/* nav bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-sm">
        <h1 className="text-2xl whitespace-nowrap">
          Character:&nbsp;<span className="font-bold">PENDING</span>
        </h1>

        <div className="flex items-center gap-4">
          {/* global edit‑mode toggle */}
          <label className="flex items-center gap-2 bg-black/60 px-3 py-2 rounded border border-white/20 cursor-pointer">
            <input
              type="checkbox"
              checked={editable}
              onChange={e => setEditable(e.target.checked)}
              className="accent-white"
            />
            Edit Character
          </label>

          {/* character selector placeholder */}
          <select className="bg-black/60 px-3 py-2 rounded border border-white/20">
            <option value="">New / Load…</option>
          </select>
        </div>
      </header>

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
        ].map((column, i) => (
          <div key={i} className="bg-black/40">
            {column.map(s => (
              <SkillRow key={s.id} {...s} editable={editable} />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
