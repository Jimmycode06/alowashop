'use client'

export default function ScrollingBanner() {
  return (
    <div className="w-full min-w-full bg-black text-white py-2 overflow-hidden relative">
      <div className="flex animate-scroll whitespace-nowrap">
        {/* Repeat the content multiple times for seamless scrolling */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-8">
            <span className="text-sm md:text-base font-medium">
              Additional 20% OFF with code: <span className="font-bold">HELLO20</span>
            </span>
            <span className="text-lg">💗</span>
          </div>
        ))}
      </div>
    </div>
  )
}
