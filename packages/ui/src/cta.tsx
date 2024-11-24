'use client'

import { Button } from "./button";

export function CTA() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-[#4942CE]">Start using Dash today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Button onClick={() => ""}>
                Get Started
            </Button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Button onClick={() => ""}>
                Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

