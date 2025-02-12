import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { Mail } from "lucide-react"
import { Timeline } from "@/components/ui/timeline"
import { Spotlight } from "@/components/ui/spotlight-new"

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Spotlight />
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <section className="space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">
              Hey, I&apos;m Jay Roy,
              <br />
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              I&apos;m a developer who enjoys building web applications and exploring new technologies — basically, I
              spend most of my time in front of a screen.
            </p>
            <div className="flex gap-4">
              <Button variant="secondary">About</Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </section>

            <Timeline
              data={[
                {
                  title: "System Prompt Generator",
                  content: (
                    <div className="group relative">
                      <div className="mt-4">
                        <h3 className="text-xl font-semibold">System Prompt Generator</h3>
                        <p className="text-zinc-400 mt-1">
                          A modern web application that helps users create effective AI system prompts with intelligent
                          suggestions.
                        </p>
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">AI</span>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "LumeAI",
                  content: (
                    <div className="group relative">
                      <div className="mt-4">
                        <h3 className="text-xl font-semibold">LumeAI</h3>
                        <p className="text-zinc-400 mt-1">
                          LumeAI is a cutting-edge AI-powered chat application featuring advanced conversation capabilities.
                        </p>
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">AI Chat</span>
                        </div>
                      </div>
                    </div>
                  ),
                }
              ]}
            />
        </div>
      </main>
    </div>
  )
}