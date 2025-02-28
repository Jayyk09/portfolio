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
      <main className="flex-1 ml-64 ">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <section className="space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">
              Hey, I&apos;m Jay Roy
              <br />
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              I&apos;m a developer 
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
                  title: "2025",
                  content: (
                    <div className="group relative">
                      <div className="mt-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-semibold">Soaper</h3>
                          <span className="text-sm text-zinc-400">March 2025 - May 2025</span>
                        </div>
                        <div className="flex justify-between items-start mt-1">
                          <p className="font-medium">Software Engineering Intern</p>
                          <span className="text-sm text-zinc-400">Dover, DE</span>
                        </div>
                        <ul className="list-disc pl-5 mt-2 text-zinc-400">
                          <li>Developed a serverless meeting booking system using Azure Communication Services and PostgreSQL, automating scheduling workflows using 100% cloud infrastructure</li>
                          <li>Designed async callback workflows with Quart and Azure OpenAI to handle speech recognition events, reducing booking latency by 47%.</li>
                        </ul>
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">Azure Cloud</span>
                          <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded ml-2">PostgreSQL</span>
                          <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded ml-2">OpenAI</span>
                          <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded ml-2">AI Agents</span>
                          <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded ml-2">FastAPI</span>
                          <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded ml-2">RESTful APIs</span>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "2024",
                  content: (
                    <div className="group relative">
                      <div className="mt-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-semibold">University of Alabama</h3>
                          <span className="text-sm text-zinc-400">Feb 2024 - Feb 2025</span>
                        </div>
                        <div className="flex justify-between items-start mt-1">
                          <p className="font-medium">Research Software Developer</p>
                          <span className="text-sm text-zinc-400">Tuscaloosa, Al</span>
                        </div>
                        <ul className="list-disc pl-5 mt-2 text-zinc-400">
                          <li>Designed and implemented object-oriented simulation software for underwater autonomous robots, utilizing Particle
                          Swarm Optimization (PSO) algorithms to improve adaptability in dynamic environments</li>
                          <li>Presented research at the IEEE Southeast Conference 2025</li>
                        </ul>
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">Python</span>
                          <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded ml-2">Algorithm Design</span>
                          <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded ml-2">Object-Oriented Programming</span>
                          <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded ml-2">Simulation</span>
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