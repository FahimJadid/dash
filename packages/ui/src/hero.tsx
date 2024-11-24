'use client'

import Image from 'next/image'
import { Button } from './button'
import hero from "../src/assets/static/hero.svg"

export function Hero() {
  return (
    <div className="relative bg-[#4942CE] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                <span className="block">Send money,</span>
                <span className="block text-[#FFD700]">split bills with ease</span>
              </h1>
              <p className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Dash makes it simple to send money to friends, split bills, and keep track of your expenses. All in one place, all in real-time.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                <Button onClick={() => ""}>
                   Get Started
                </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src={hero}
          alt="People using Dash app"
          width={800}
          height={600}
        />
      </div>
    </div>
  )
}

