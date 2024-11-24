'use client'

import { useState } from 'react'
import { Menu, X, LogIn, CreditCard, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image';
import { Button } from './button';


interface AppbarProps {
  user?: {
    name?: string | null;
  },
  onSignIn: () => void;
  onSignOut: () => void;
  logo: string;
}

const navItems = [
  { name: 'Send & Receive', href: '#' },
  { name: 'Pay With Dash', href: '#' },
  { name: 'Transactions', href: '#' },
];

export function Appbar({ user, onSignIn, onSignOut, logo }: AppbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#4942CE] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold">
                <Image src={logo} width={48} height={48} alt='Dash Logo' />
              </span>
            </Link>
            <div className="hidden md:block ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:bg-[#5B55D6] px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Button onClick={user ? onSignOut : onSignIn}>
                <LogIn className="mr-2 h-4 w-4" /> {user ? "Logout" : "Login"}
              </Button>
              {user && <UserMenu />}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#5B55D6] focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:bg-[#5B55D6] block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Button onClick={user ? onSignOut : onSignIn} >
              <LogIn className="inline-block mr-2 h-4 w-4" /> {user ? "Logout" : "Login"}
            </Button>
          </div>
          {user && (
            <div className="pt-4 pb-3 border-t border-[#5B55D6]">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">{user.name}</div>
                  <div className="text-sm font-medium text-[#B3B0E6]">john@example.com</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#5B55D6]"
                >
                  Your Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#5B55D6]"
                >
                  Settings
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-3 relative">
      <div>
        <button
          className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#4942CE] focus:ring-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            className="h-8 w-8 rounded-full"
            src="https://github.com/shadcn.png"
            alt="User avatar"
          />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <CreditCard className="inline-block mr-2 h-4 w-4" /> Card
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <Settings className="inline-block mr-2 h-4 w-4" /> Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <LogOut className="inline-block mr-2 h-4 w-4" /> Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}