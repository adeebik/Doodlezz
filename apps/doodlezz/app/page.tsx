import { Button } from "@repo/ui/button";
import Link from "next/link";
import { Paintbrush, Users, Zap, PencilLine, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen grainy overflow-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-black p-2 rounded-lg">
            <PencilLine className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight">Doodlezz</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/signin">
            <Button variant="secondary" className="border-none bg-red-200 shadow-none text-gray-600 px-3 py-2">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button variant="pastel-red" className="border-none bg-orange-200 shadow-none text-zinc-700 px-3 py-2" >Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-sm font-bold">Now in Beta! 🎨</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tight text-black">
              Draw together, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A8A] to-[#FFC88A]">anywhere.</span>
            </h1>
            
            <p className="text-xl font-medium text-gray-700 max-w-xl">
              The simplest collaborative drawing environment. Share a link, start sketching, and bring your ideas to life with anyone in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button variant="pastel-orange" className="text-lg px-10 py-4">
                  Start Drawing Now
                </Button>
              </Link>
              <Button variant="secondary" className="text-lg px-10 py-4 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-beige flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="avatar" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-gray-600">
                Joined by <span className="text-black">2,000+</span> creative minds
              </p>
            </div>
          </div>

          <div className="relative">
            {/* Playful UI Elements */}
            <div className="bg-white border-4 border-black p-8 rounded-3xl shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-3 h-3 rounded-full bg-red-400 border-2 border-black" />
                 <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-black" />
                 <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-black" />
               </div>
               <div className="aspect-video bg-beige/50 border-2 border-dashed border-black rounded-xl flex items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                  <div className="text-center group cursor-pointer">
                    <PencilLine className="w-16 h-16 mx-auto text-black/20 group-hover:text-black group-hover:scale-110 transition-all" />
                    <p className="text-black/30 font-bold mt-4">Sketch area</p>
                  </div>
               </div>
            </div>

            {/* Floating Icons */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#FFB7B7] border-4 border-black rounded-2xl flex items-center justify-center -rotate-12 animate-bounce">
              <Paintbrush className="w-10 h-10 text-[#8B0000]" />
            </div>
            <div className="absolute -bottom-6 -left-10 w-24 h-24 bg-[#FFD8B1] border-4 border-black rounded-full flex items-center justify-center rotate-12">
              <Users className="w-12 h-12 text-[#A0522D]" />
            </div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-[#B7E4B7] border-4 border-black rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-[#006400]" />
            </div>
          </div>
        </div>
      </main>

      {/* Feature Section Preview */}
      <section className="bg-white border-y-4 border-black py-12 overflow-hidden whitespace-nowrap relative z-10">
        <div className="flex gap-20 animate-marquee hover:[animation-play-state:paused] w-max">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-3xl font-black italic">COLLABORATE</span>
              <div className="w-3 h-3 bg-[#FF8A8A] rounded-full" />
              <span className="text-3xl font-black italic">CREATE</span>
              <div className="w-3 h-3 bg-[#FFC88A] rounded-full" />
              <span className="text-3xl font-black italic">REITERATE</span>
              <div className="w-3 h-3 bg-[#B7E4B7] rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Why Doodlezz? */}
      <section className="py-24 px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl font-black tracking-tight">Built for speed, <br/><span className="text-gray-400">designed for fun.</span></h2>
          <p className="text-xl font-medium text-gray-600 max-w-2xl mx-auto">Skip the complicated tools. Start drawing in seconds with our lightning-fast, collaborative engine.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Real-time Sync", desc: "Every stroke is synchronized instantly across all devices. No lag, just magic.", icon: Zap, color: "bg-yellow-100" },
            { title: "Link-based Rooms", desc: "No registration required for guests. Just copy the URL and start drawing together.", icon: Users, color: "bg-blue-100" },
            { title: "Infinite Canvas", desc: "Never run out of space. Our canvas grows with your imagination and ideas.", icon: Paintbrush, color: "bg-green-100" }
          ].map((feature, i) => (
            <div key={i} className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
              <div className={`${feature.color} w-16 h-16 border-2 border-black rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
              <p className="font-medium text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#FFD8B1] border-y-4 border-black py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-5xl font-black leading-tight">Three steps to <br/>creative nirvana.</h2>
              <div className="space-y-4">
                {[
                  { step: "01", text: "Create a room with one click" },
                  { step: "02", text: "Share the link with your team" },
                  { step: "03", text: "Draw, sketch, and innovate" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xl font-black bg-black text-white w-10 h-10 rounded-lg flex items-center justify-center">{item.step}</span>
                    <span className="text-xl font-bold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-white border-4 border-black p-4 rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
              <div className="aspect-square bg-beige rounded-lg border-2 border-dashed border-black flex items-center justify-center">
                 <Sparkles className="w-24 h-24 text-black/10 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-8 max-w-7xl mx-auto text-center relative z-10">
        <div className="bg-black text-white p-12 md:p-20 rounded-[3rem] space-y-8 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
          <h2 className="text-5xl md:text-7xl font-black tracking-tight relative z-10">Ready to start <br/>your next masterpiece?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
            <Link href="/signup">
              <Button variant="pastel-orange" className="text-xl px-12 py-6 h-auto">Join Doodlezz for Free</Button>
            </Link>
          </div>
          <p className="text-gray-400 font-bold tracking-widest text-sm relative z-10 uppercase">No credit card required • Instant setup</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-sm font-bold text-gray-500">
          © 2026 Doodlezz Inc. Built for artists.
        </p>
        <div className="flex gap-8">
           <Link href="#" className="text-sm font-bold hover:underline">Privacy</Link>
           <Link href="#" className="text-sm font-bold hover:underline">Twitter</Link>
           <Link href="#" className="text-sm font-bold hover:underline">Discord</Link>
        </div>
      </footer>
    </div>
  );
}
