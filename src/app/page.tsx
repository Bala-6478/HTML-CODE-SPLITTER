import { ExtractorTool } from "@/components/extractor-tool"
import { Layers } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const brandName = "HTML CODE SPLITTER";

  return (
    <main className="min-h-screen pb-10 bg-background text-foreground font-body">
      {/* Navigation / Header */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="bg-primary p-1.5 rounded-lg shadow-sm group-hover:rotate-12 transition-transform">
              <Layers className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight uppercase bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              HTML CODE SPLITTER
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-8 pb-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tighter uppercase mb-2 overflow-hidden py-1">
            <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {brandName.split("").map((char, i) => (
                <span 
                  key={i} 
                  className="animate-reveal" 
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>
        </div>
      </section>

      {/* Main Tool */}
      <section className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ExtractorTool />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <span className="font-headline font-bold text-lg uppercase bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                HTML CODE SPLITTER
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              @2026 BEST TEAM BUILDING THIS PROJECT
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
