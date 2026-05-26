import { Leaf, Sun } from 'lucide-react'

// top navbar - dark forest green with leaf branding and sun toggle
function Navbar() {
  return (
    <nav className="bg-[#0d1a0d]/95 backdrop-blur-sm shadow-lg border-b border-white/5">
      <div className="max-w-5xl mx-auto px-5 py-3.5 flex items-center justify-between">

        {/* left side - brand name with leaf icon */}
        <div className="flex items-center gap-2.5">
          <Leaf className="w-5 h-5 text-green-400" />
          <span className="text-white font-semibold text-lg">Supremus Angel</span>
          <span className="bg-white/10 text-white/70 text-xs px-2.5 py-0.5 rounded-full border border-white/15">
            Data Visualizer
          </span>
        </div>

        {/* right side - tagline and theme button */}
        <div className="flex items-center gap-4">
          <span className="text-white/40 text-sm hidden md:block">
            Build &middot; Visualize &middot; Save
          </span>
          {/* sun toggle button - decorative for now */}
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white/90 transition-all">
            <Sun className="w-4 h-4" />
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
