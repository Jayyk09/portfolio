"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Compass,
  Briefcase,
  FolderGit2,
  Settings,
  User,
  LayoutGrid,
  BookOpen,
  AlertTriangle,
  Contact,
  Users,
  Twitter,
} from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Explore", href: "/", icon: Compass, number: "1" },
  { name: "Projects", href: "/projects", icon: FolderGit2, number: "2" },
  { name: "About", href: "#about", icon: User, number: "3" },
]

const resources = [
  { name: "Thoughts", href: "#thoughts", icon: BookOpen, number: "4" },
  { name: "Today I Learned", href: "#til", icon: Settings, number: "5" },
]

// const extras = [
//   { name: "Guest Book", href: "#guestbook", icon: Users, shortcut: "G" },
//   { name: "Don't Click", href: "#dont-click", icon: AlertTriangle, shortcut: "D" },
// ]

// const connect = [
//   { name: "Contact", href: "#contact", icon: Contact, shortcut: "C" },
//   { name: "Twitter", href: "https://twitter.com", icon: Twitter, external: true },
// ]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="fixed left-0 top-0 w-64 h-screen border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
      <div className="flex flex-col h-full px-4 py-8">
        <div className="flex items-center gap-3 px-2">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="Jay Roy" />
            <AvatarFallback className="bg-zinc-800">JR</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Jay Roy</h2>
            <p className="text-sm text-zinc-400">Software Engineer</p>
          </div>
        </div>

        <nav className="flex-1 mt-8 space-y-6">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-2 py-1 text-zinc-400 hover:text-zinc-100 rounded-md group relative",
                  pathname === item.href && "text-zinc-100",
                )}
                onClick={(e) => {
                  if (item.href.startsWith('/')) {
                    e.preventDefault()
                    router.push(item.href)
                  }
                }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
                <span className="absolute right-2 text-sm opacity-50">{item.number}</span>
              </Link>
            ))}
          </div>

          <div>
            <h3 className="px-2 text-xs font-semibold text-zinc-500 uppercase">Resources</h3>
            <div className="mt-2 space-y-1">
              {resources.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-2 py-1 text-zinc-400 hover:text-zinc-100 rounded-md group relative"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                  <span className="absolute right-2 text-sm opacity-50">{item.number}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* <div>
            <h3 className="px-2 text-xs font-semibold text-zinc-500 uppercase">Extras</h3>
            <div className="mt-2 space-y-1">
              {extras.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-2 py-1 text-zinc-400 hover:text-zinc-100 rounded-md group relative"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                  <span className="absolute right-2 text-sm opacity-50">{item.shortcut}</span>
                </Link>
              ))}
            </div>
          </div> */}

          {/* <div>
            <h3 className="px-2 text-xs font-semibold text-zinc-500 uppercase">Connect</h3>
            <div className="mt-2 space-y-1">
              {connect.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  className="flex items-center gap-3 px-2 py-1 text-zinc-400 hover:text-zinc-100 rounded-md group relative"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                  {item.shortcut && <span className="absolute right-2 text-sm opacity-50">{item.shortcut}</span>}
                </Link>
              ))}
            </div>
          </div> */}
        </nav>

        <div className="relative mt-4">
          <div className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 bg-zinc-900/50 rounded-lg">
            <span className="flex-1">Search or Ask...</span>
            <kbd className="px-2 py-1 text-xs bg-zinc-800 rounded">⌘ K</kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
