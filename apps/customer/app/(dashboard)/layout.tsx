"use client"

import { useState } from 'react'
import { Home, Send, ArrowLeftRight, Menu, X, HandCoins } from 'lucide-react'
import { SidebarItem } from '../components/SidebarItem'

const sidebarItems = [
  { icon: Home, title: 'Home', href: '/dashboard' },
  { icon: Send, title: 'Transfer', href: '/transfer' },
  { icon: ArrowLeftRight, title: 'Transactions', href: '/transactions' },
  { icon: HandCoins, title: 'P2P Transfer', href: '/p2p' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for larger screens */}
        <aside className="hidden md:flex w-64 flex-col bg-[#4942CE] p-4">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                title={item.title}
                href={item.href}
              />
            ))}
          </nav>
        </aside>

        {/* Mobile sidebar */}
        <div className="md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed z-50 bottom-4 right-4 bg-[#4942CE] text-white p-2 rounded-full shadow-lg"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
          {isSidebarOpen && (
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)}>
              <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#4942CE] p-4">
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <SidebarItem
                      key={item.href}
                      icon={item.icon}
                      title={item.title}
                      href={item.href}
                    />
                  ))}
                </nav>
              </aside>
            </div>
          )}
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

