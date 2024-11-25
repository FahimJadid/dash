'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Phone, Lock, ArrowRight, ChevronDown } from 'lucide-react'

const countryOptions = [
  { key: '+880', value: 'Bangladesh (+880)' },
  { key: '+1', value: 'United States (+1)' },
  { key: '+44', value: 'United Kingdom (+44)' },
  { key: '+91', value: 'India (+91)' },
]

export function LoginForm() {
  const [countryCode, setCountryCode] = useState(countryOptions[0]?.key || "")
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const fullPhoneNumber = `${countryCode}${phoneNumber}`

    try {
      const result = await signIn('credentials', {
        redirect: false,
        phone: fullPhoneNumber,
        password: password,
      })

      if (result?.error) {
        setError('Invalid phone number or password')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="flex rounded-md shadow-sm">
          <div className="relative inline-flex">
            <button
              type="button"
              className="inline-flex justify-center rounded-l-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {countryCode}
              <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </button>
            {isDropdownOpen && (
              <div className="origin-top-right absolute left-0 mt-12 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {countryOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => {
                        setCountryCode(option.key)
                        setIsDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {option.value}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative flex-1">
          <input
            type="tel"
            name="phone-number"
            id="phone-number"
            className="flex-1 block w-full rounded-r-md sm:text-sm border-gray-300 pl-2 pr-10 outline-none"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full pr-10 pl-3 sm:text-sm border-gray-300 rounded-md outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4942CE] hover:bg-[#3d37b3] transition-colors duration-200 ease-in-out"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            <span className="flex items-center">
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          )}
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
        Login if you have an account already or it'll signup with the given credentials
      </div>
    </form>
  )
}

