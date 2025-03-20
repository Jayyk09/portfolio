"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Plus, Circle, Trash2 } from "lucide-react"
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
  showHeart: boolean
}

export function PandaPet({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pet, setPet] = useState<PetState>({
    x: 50,
    y: 10,
    direction: "right",
    action: "idle",
    lastAction: "idle",
    actionDuration: 0,
    showHeart: false,
  })

  // Handle pet movement and behavior
  useEffect(() => {
    const interval = setInterval(() => {
      setPet((prev) => {
        // Increment action duration
        const actionDuration = prev.actionDuration + 1

        // Special actions have limited duration - increased from 5 to 15
        if (["swipe", "withBall", "lying"].includes(prev.action) && actionDuration > 15) {
          return {
            ...prev,
            action: prev.lastAction === "idle" ? "idle" : "walking",
            lastAction: prev.action,
            actionDuration: 0,
            showHeart: false,
          }
        }

        // Random behavior changes
        const randomValue = Math.random()

        // If currently in a basic state (idle, walking, running), consider changing
        if (["idle", "walking", "walkingFast", "running"].includes(prev.action)) {
          // Reduced chance to do a special action from 5% to 2%
          if (randomValue < 0.02) {
            const specialActions: PandaAction[] = ["swipe", "lying"]
            const newAction = specialActions[Math.floor(Math.random() * specialActions.length)]

            // 30% chance to show heart with special action
            const showHeart = Math.random() < 0.3

            return {
              ...prev,
              action: newAction,
              lastAction: prev.action,
              actionDuration: 0,
              showHeart,
            }
          }

          // Reduced chance to change basic action from 15% to 5%
          if (randomValue < 0.05) {
            const basicActions: PandaAction[] = ["idle", "walking", "walkingFast", "running"]
            let newAction: PandaAction

            do {
              newAction = basicActions[Math.floor(Math.random() * basicActions.length)]
            } while (newAction === prev.action)

            return {
              ...prev,
              action: newAction,
              actionDuration: 0,
              showHeart: false,
            }
          }
        }

        // Calculate new position based on action
        let x = prev.x
        let direction = prev.direction

        const speed =
          prev.action === "running" ? 6 : prev.action === "walkingFast" ? 4 : prev.action === "walking" ? 2 : 0

        if (speed > 0) {
          x += direction === "right" ? speed : -speed

          // Boundary check - ONLY change direction at the edges
          const container = containerRef.current
          if (container) {
            const maxX = container.clientWidth - 40
            if (x < 0) {
              x = 0
              direction = "right"
            }
            if (x > maxX) {
              x = maxX
              direction = "left"
            }
          }
        }

        return {
          ...prev,
          x,
          direction,
          actionDuration,
          // Increased heart display duration from 3 to 8
          showHeart: prev.showHeart && actionDuration < 8,
        }
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Handle pet interaction
  const handlePetClick = () => {
    setPet((prev) => {
      // Show heart in speech bubble and make panda swipe when clicked
      return {
        ...prev,
        action: "swipe",
        lastAction: prev.action,
        actionDuration: 0,
        showHeart: true,
      }
    })
  }

  // Handle ball button click
  const handleBallClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPet((prev) => ({
      ...prev,
      action: "withBall",
      lastAction: prev.action,
      actionDuration: 0,
    }))
  }

  return (
    <div className={cn("w-full border-t border-zinc-800", className)}>
      <div className="flex items-center justify-between px-2 py-1 bg-zinc-900">
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium">VS CODE PETS</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-zinc-800 rounded">
            <Plus className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-zinc-800 rounded" onClick={handleBallClick}>
            <Circle className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-zinc-800 rounded">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div ref={containerRef} className="relative h-40 bg-zinc-900/50 overflow-hidden">
        <div
          className="absolute cursor-pointer transition-all duration-1000"
          style={{
            left: `${pet.x}px`,
            bottom: `${pet.y}px`,
            transform: `scaleX(${pet.direction === "left" ? -1 : 1})`,
          }}
          onClick={handlePetClick}
        >
          {/* Speech bubble */}
          {pet.showHeart && <SpeechBubble>❤️</SpeechBubble>}

          {/* Panda */}
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
    </div>
  )
}

interface SpeechBubbleProps {
  children: React.ReactNode
  className?: string
  position?: "top" | "bottom" | "left" | "right"
}

export function SpeechBubble({ children, className, position = "top" }: SpeechBubbleProps) {
  return (
    <div
      className={cn(
        "absolute bg-white text-black rounded-lg px-3 py-2 text-sm animate-bounce",
        position === "top" && "-top-12 left-1/2 -translate-x-1/2",
        position === "bottom" && "-bottom-12 left-1/2 -translate-x-1/2",
        position === "left" && "top-1/2 -left-12 -translate-y-1/2",
        position === "right" && "top-1/2 -right-12 -translate-y-1/2",
        className,
      )}
    >
      {children}
      <div
        className={cn(
          "absolute w-3 h-3 bg-white transform rotate-45",
          position === "top" && "bottom-[-6px] left-1/2 -translate-x-1/2",
          position === "bottom" && "top-[-6px] left-1/2 -translate-x-1/2",
          position === "left" && "right-[-6px] top-1/2 -translate-y-1/2",
          position === "right" && "left-[-6px] top-1/2 -translate-y-1/2",
        )}
      />
    </div>
  )
}        