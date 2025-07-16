import AttributeBox from './components/AttributeBox';
import SkillRow     from './components/SkillRow';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* full‑screen background image */}
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
        <div className="text-3xl tracking-widest">EMPYREAN</div>
        <select className="bg-black/60 px-3 py-2 rounded border border-white/20">
          <option value="">New / Load…</option>
        </select>
      </header>

      {/* ── Attribute squares ────────────────────────────── */}
      <section className="grid grid-cols-5 gap-4 p-6">
        {[
          { id: 'might',  label: 'Might'  },
          { id: 'reflex', label: 'Reflex' },
          { id: 'wits',   label: 'Wits'   },
          { id: 'charm',  label: 'Charm'  },
          { id: 'spirit', label: 'Spirit' },
        ].map(attr => (
          <AttributeBox key={attr.id} {...attr} />
        ))}
      </section>

      {/* ── Skills ───────────────────────────────────────── */}
      <section className="grid grid-cols-3 gap-4 px-6 pb-10">
        {/* Column 1 */}
        <div className="bg-black/40">
          {[
            { id: 'strength',     label: 'Strength'     },
            { id: 'celerity',     label: 'Celerity'     },
            { id: 'coordination', label: 'Coordination' },
            { id: 'endurance',    label: 'Endurance'    },
            { id: 'craft',        label: 'Craft'        },
          ].map(s => (
            <SkillRow key={s.id} {...s} />
          ))}
        </div>

        {/* Column 2 */}
        <div className="bg-black/40">
          {[
            { id: 'reason',      label: 'Reason'      },
            { id: 'awareness',   label: 'Awareness'   },
            { id: 'information', label: 'Information' },
            { id: 'composure',   label: 'Composure'   },
            { id: 'systems',     label: 'Systems'     },
          ].map(s => (
            <SkillRow key={s.id} {...s} />
          ))}
        </div>

        {/* Column 3 */}
        <div className="bg-black/40">
          {[
            { id: 'presence',    label: 'Presence'     },
            { id: 'intuition',   label: 'Intuition'    },
            { id: 'manipulation',label: 'Manipulation' },
            { id: 'discipline',  label: 'Discipline'   },
            { id: 'anima',       label: 'Anima'        },
          ].map(s => (
            <SkillRow key={s.id} {...s} />
          ))}
        </div>
      </section>
    </div>
  );
}
