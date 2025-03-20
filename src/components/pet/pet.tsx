"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Plus, Circle, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

type PetType = "cat" | "dog" | "fox" | "snake"
type PetColor = "brown" | "black" | "white" | "gray"

interface PetState {
  x: number
  y: number
  direction: "left" | "right"
  action: "idle" | "walking" | "sleeping" | "playing"
}

interface PetProps {
  type?: PetType
  color?: PetColor
  className?: string
}

export function Pet({ type = "cat", color = "brown", className }: PetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [pet, setPet] = useState<PetState>({
    x: 50,
    y: 80,
    direction: "right",
    action: "idle",
  })

  // Pet sprites - simplified for this example
  const petSprites = {
    cat: {
      idle: {
        right: "🐈",
        left: "🐈",
      },
      walking: {
        right: "🐈",
        left: "🐈",
      },
      sleeping: {
        right: "😴",
        left: "😴",
      },
      playing: {
        right: "🐈",
        left: "🐈",
      },
    },
  }

  // Handle pet movement
  useEffect(() => {
    if (!isOpen) return

    const interval = setInterval(() => {
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
          return { ...prev, action: "sleeping" }
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
        const y = prev.y

        if (action === "walking") {
          x += direction === "right" ? 5 : -5

          // Boundary check
          const container = containerRef.current
          if (container) {
            const maxX = container.clientWidth - 30
            if (x < 0) {
              x = 0
              return { ...prev, x, direction: "right", action }
            }
            if (x > maxX) {
              x = maxX
              return { ...prev, x, direction: "left", action }
            }
          }
        }

        return { ...prev, x, y, direction, action }
      })
    }, 500)

    return () => clearInterval(interval)
  }, [isOpen])

  // Handle pet interaction
  const handlePetClick = () => {
    setPet((prev) => ({
      ...prev,
      action: prev.action === "playing" ? "idle" : "playing",
    }))
  }

  // Get current sprite
  const getSprite = () => {
    return petSprites.cat[pet.action][pet.direction]
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
            className="absolute text-2xl cursor-pointer transition-all duration-500 transform hover:scale-110"
            style={{
              left: `${pet.x}px`,
              bottom: `${pet.y}px`,
              transform: `scaleX(${pet.direction === "left" ? -1 : 1})`,
            }}
            onClick={handlePetClick}
          >
            {getSprite()}
          </div>
        </div>
      )}
    </div>
  )
}

