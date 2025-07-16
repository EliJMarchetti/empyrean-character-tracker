export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* full‑screen background image */}
      <img
        src="/background.jpeg"          /* <— file lives in /public */
        alt="Empyrean code‑flare backdrop"
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

      {/* five attribute squares */}
      <section className="grid grid-cols-5 gap-4 p-6">
        {['Might', 'Reflex', 'Wits', 'Charm', 'Spirit'].map(label => (
          <div key={label} className="bg-black/50 aspect-square flex flex-col">
            <div className="h-1/4 flex items-center justify-center border-b border-white/20">
              {label}
            </div>
            <div className="h-1/2 flex items-center justify-center text-4xl">
              0
            </div>
            <div className="h-1/4 border-t border-white/20 text-xs px-2 py-1 overflow-hidden">
              notes…
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
