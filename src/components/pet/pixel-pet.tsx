"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Plus, Circle, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface PetState {
  x: number
  y: number
  direction: "left" | "right"
  action: "idle" | "walking" | "sleeping" | "playing"
  frame: number
}

export function PixelPet({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [pet, setPet] = useState<PetState>({
    x: 50,
    y: 10,
    direction: "right",
    action: "idle",
    frame: 0,
  })

  // Handle pet animation and movement
  useEffect(() => {
    if (!isOpen) return

    const animationInterval = setInterval(() => {
      setPet((prev) => ({
        ...prev,
        frame: (prev.frame + 1) % 2,
      }))
    }, 300)

    const movementInterval = setInterval(() => {
      setPet((prev) => {
        if (prev.action === "sleeping") {
          // 10% chance to wake up
          if (Math.random() < 0.1) {
            return { ...prev, action: "idle" }
          }
          return prev
        }

        // 5% chance to sleep
        if (Math.random() < 0.05) {
          return { ...prev, action: "sleeping", frame: 0 }
        }

        // 30% chance to change direction when walking
        const direction =
          prev.action === "walking" && Math.random() < 0.3
            ? prev.direction === "left"
              ? "right"
              : "left"
            : prev.direction

        // 20% chance to start/stop walking
        const action = Math.random() < 0.2 ? (prev.action === "idle" ? "walking" : "idle") : prev.action

        // Calculate new position
        let x = prev.x

        if (action === "walking") {
          x += direction === "right" ? 3 : -3

          // Boundary check
          const container = containerRef.current
          if (container) {
            const maxX = container.clientWidth - 24
            if (x < 0) {
              x = 0
              return { ...prev, x, direction: "right", action, frame: 0 }
            }
            if (x > maxX) {
              x = maxX
              return { ...prev, x, direction: "left", action, frame: 0 }
            }
          }
        }

        return { ...prev, x, direction, action }
      })
    }, 500)

    return () => {
      clearInterval(animationInterval)
      clearInterval(movementInterval)
    }
  }, [isOpen])

  // Handle pet interaction
  const handlePetClick = () => {
    setPet((prev) => ({
      ...prev,
      action: prev.action === "playing" ? "idle" : "playing",
      frame: 0,
    }))
  }

  return (
    <div className={cn("w-full border-t border-zinc-800", className)}>
      <div
        className="flex items-center justify-between px-2 py-1 cursor-pointer bg-zinc-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1">
          <ChevronDown className={cn("w-4 h-4 transition-transform", !isOpen && "-rotate-90")} />
          <span className="text-xs font-medium">VS CODE PETS</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-zinc-800 rounded">
            <Plus className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-zinc-800 rounded">
            <Circle className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-zinc-800 rounded">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div ref={containerRef} className="relative h-40 bg-zinc-900/50 overflow-hidden">
          <div
            className="absolute cursor-pointer transition-all duration-300"
            style={{
              left: `${pet.x}px`,
              bottom: `${pet.y}px`,
              transform: `scaleX(${pet.direction === "left" ? -1 : 1})`,
            }}
            onClick={handlePetClick}
          >
            <div className="w-6 h-6 relative">
              <Image
                src="/images/cat-sprite.png"
                alt="Pixel Pet"
                width={24}
                height={24}
                className="image-rendering-pixelated"
                style={{
                  objectFit: "none",
                  objectPosition: pet.action === "sleeping" ? "-48px 0" : pet.frame === 0 ? "0 0" : "-24px 0",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

