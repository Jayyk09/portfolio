"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Plus, Circle, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Panda animation states and their corresponding GIFs
const pandaAnimations = {
  idle: "/panda/black_idle_8fps.gif",
  walking: "/panda/black_walk_8fps.gif",
  running: "/panda/black_run_8fps.gif",
  walkingFast: "/panda/black_walk_fast_8fps.gif",
  withBall: "/panda/black_with_ball_8fps.gif",
  swipe: "/panda/black_swipe_8fps.gif",
  lying: "/panda/black_lie_8fps.gif",
}

type PandaAction = "idle" | "walking" | "running" | "walkingFast" | "withBall" | "swipe" | "lying"

interface PetState {
  x: number
  y: number
  direction: "left" | "right"
  action: PandaAction
  lastAction: PandaAction
  actionDuration: number
}

export function Pet({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [pet, setPet] = useState<PetState>({
    x: 50,
    y: 10,
    direction: "right",
    action: "idle",
    lastAction: "idle",
    actionDuration: 0,
  })

  // Handle pet movement and behavior
  useEffect(() => {
    if (!isOpen) return

    const interval = setInterval(() => {
      setPet((prev) => {
        // Increment action duration
        const actionDuration = prev.actionDuration + 1

        // Special actions have limited duration
        if (["swipe", "withBall", "lying"].includes(prev.action) && actionDuration > 5) {
          return {
            ...prev,
            action: prev.lastAction === "idle" ? "idle" : "walking",
            lastAction: prev.action,
            actionDuration: 0,
          }
        }

        // Random behavior changes
        const randomValue = Math.random()

        // If currently in a basic state (idle, walking, running), consider changing
        if (["idle", "walking", "walkingFast", "running"].includes(prev.action)) {
          // 5% chance to do a special action
          if (randomValue < 0.05) {
            const specialActions: PandaAction[] = ["swipe", "withBall", "lying"]
            const newAction = specialActions[Math.floor(Math.random() * specialActions.length)]
            return {
              ...prev,
              action: newAction,
              lastAction: prev.action,
              actionDuration: 0,
            }
          }

          // 10% chance to change basic action
          if (randomValue < 0.15) {
            const basicActions: PandaAction[] = ["idle", "walking", "walkingFast", "running"]
            let newAction: PandaAction

            do {
              newAction = basicActions[Math.floor(Math.random() * basicActions.length)]
            } while (newAction === prev.action)

            return {
              ...prev,
              action: newAction,
              actionDuration: 0,
            }
          }

          // 8% chance to change direction when moving
          if (["walking", "walkingFast", "running"].includes(prev.action) && randomValue < 0.23) {
            const direction = prev.direction === "left" ? "right" : "left"
            return { ...prev, direction, actionDuration }
          }
        }

        // Calculate new position based on action
        let x = prev.x
        const speed =
          prev.action === "running" ? 6 : prev.action === "walkingFast" ? 4 : prev.action === "walking" ? 2 : 0

        if (speed > 0) {
          x += prev.direction === "right" ? speed : -speed

          // Boundary check
          const container = containerRef.current
          if (container) {
            const maxX = container.clientWidth - 40
            if (x < 0) {
              x = 0
              return {
                ...prev,
                x,
                direction: "right",
                actionDuration,
              }
            }
            if (x > maxX) {
              x = maxX
              return {
                ...prev,
                x,
                direction: "left",
                actionDuration,
              }
            }
          }
        }

        return { ...prev, x, actionDuration }
      })
    }, 200)

    return () => clearInterval(interval)
  }, [isOpen])

  // Handle pet interaction
  const handlePetClick = () => {
    setPet((prev) => {
      // Cycle through some fun interactions when clicked
      const clickActions: PandaAction[] = ["swipe", "withBall", "lying"]
      const currentIndex = clickActions.indexOf(prev.action as PandaAction)
      const nextIndex = (currentIndex + 1) % clickActions.length

      return {
        ...prev,
        action: clickActions[nextIndex],
        lastAction: prev.action,
        actionDuration: 0,
      }
    })
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
            <div className="w-10 h-10 relative">
              <Image
                src={pandaAnimations[pet.action] || "/placeholder.svg"}
                alt="Panda Pet"
                width={40}
                height={40}
                className="image-rendering-pixelated"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

