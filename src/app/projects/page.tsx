"use client";

import { Spotlight } from "@/components/ui/spotlight-new";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useRef } from "react";

export default function Projects() {
  return (
    <div className="flex min-h-screen">      
      <Spotlight />
      <Sidebar />
      
      {/* Main content - expanded width */}
      <main className="flex-1 ml-64">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <section className="space-y-6">
            <h1 className="text-6xl font-bold tracking-tight">Projects</h1>
            <p className="text-xl text-zinc-400 max-w-3xl">
              Building things that I find interesting.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* System Prompt Generator */}
              <div className="group relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors overflow-hidden">
                <div className="relative z-10">
                  <img 
                    src="/images/prompt-generator.png" 
                    alt="System Prompt Generator" 
                    className="w-full rounded-md mb-4"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-4">System Prompt Generator</h3>
                <p className="text-zinc-400 mt-2">
                  A modern web application that helps users create effective AI system prompts with intelligent suggestions.
                </p>
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-zinc-300 bg-zinc-800 rounded-full">AI</span>
                </div>
              </div>

              {/* LumeAI */}
              <div className="group relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors overflow-hidden">
                <div className="relative z-10">
                  <img 
                    src="/images/lumeai.png" 
                    alt="LumeAI" 
                    className="w-full rounded-md mb-4"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-4">LumeAI</h3>
                <p className="text-zinc-400 mt-2">
                  LumeAI is a cutting-edge AI-powered chat application featuring advanced conversation capabilities.
                </p>
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-zinc-300 bg-zinc-800 rounded-full">AI Chat</span>
                </div>
              </div>

              {/* Pomodoro Task Manager */}
              <div className="group relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors overflow-hidden">
                <div className="relative z-10">
                  <img 
                    src="/images/pomodoro.png" 
                    alt="Pomodoro Task Manager" 
                    className="w-full rounded-md mb-4"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-4">Pomodoro Task Manager</h3>
                <p className="text-zinc-400 mt-2">
                  Productivity application combining pomodoro technique with task management and music integration.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">Productivity</span>
                  <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">Electron</span>
                </div>
              </div>

              {/* Rotaract Admin Panel */}
              <div className="group relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors overflow-hidden">
                <div className="relative z-10">
                  <img 
                    src="/images/rotaract.png" 
                    alt="Rotaract Admin Panel" 
                    className="w-full rounded-md mb-4"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-4">Rotaract Admin Panel</h3>
                <p className="text-zinc-400 mt-2">
                  Administrative dashboard for Rotaract clubs to manage members, events, and track volunteer activities.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">Dashboard</span>
                  <span className="inline-block px-2 py-1 text-xs text-zinc-400 bg-zinc-800 rounded">React</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
