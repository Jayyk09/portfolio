"use client";

import { Spotlight } from "@/components/ui/spotlight-new";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useRef } from "react";
import { projects} from "./project";

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.title} className="group relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors overflow-hidden">
                <div className="relative z-10">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full rounded-md mb-4"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
                <p className="text-zinc-400 mt-2">{project.description}</p>
                {project.highlight && (
                  <p className="text-red-400 mt-2 font-bold">{project.highlight}</p>
                )}
              </div>
            ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
