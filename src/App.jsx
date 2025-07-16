import AttributeBox from './components/AttributeBox';

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

      {/* five attribute squares (interactive) */}
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
    </div>
  );
}
