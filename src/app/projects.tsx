"use client";

import { Spotlight } from "@/components/ui/spotlight-new";

export default function Projects() {
  return (
    <div className="flex min-h-screen">
      <Spotlight />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <section className="space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">Projects</h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              A collection of projects I've worked on, from web applications to open source contributions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="group relative p-6 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                <h3 className="text-xl font-semibold">System Prompt Generator</h3>
                <p className="text-zinc-400 mt-2">
                  A modern web application that helps users create effective AI system prompts with intelligent suggestions.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">AI</span>
                  <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">React</span>
                </div>
              </div>

              <div className="group relative p-6 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                <h3 className="text-xl font-semibold">LumeAI</h3>
                <p className="text-zinc-400 mt-2">
                  LumeAI is a cutting-edge AI-powered chat application featuring advanced conversation capabilities.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">AI Chat</span>
                  <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">Next.js</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
