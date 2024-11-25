import Image from 'next/image'
import { LoginForm } from '../../components/LoginForm'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4942CE] to-[#3835A8] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Image
            src="/dash-logo.svg"
            alt="Dash Logo"
            width={90}
            height={90}
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-200">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

