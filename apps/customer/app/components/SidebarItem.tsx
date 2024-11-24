"use client"

import { usePathname } from "next/navigation";
import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'

interface SidebarItemProps {
  href: string
  title: string
  icon: LucideIcon
}

export function SidebarItem({ icon: Icon, title, href}: SidebarItemProps) {
    const pathname = usePathname()
    const isActive = pathname === href
  return (
    <Link
      href={href}
      className={`flex items-center p-2 rounded-lg ${
        isActive
          ? 'bg-[#5B55D6] text-white'
          : 'text-[#B3B0E6] hover:bg-[#5B55D6] hover:text-white'
      }`}
    >
      <Icon className="w-6 h-6 mr-3" />
      <span className="font-medium">{title}</span>
    </Link>
  )
}

