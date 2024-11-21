import dash from './assets/static/dash.svg'
import { Button } from './button';

interface AppbarProps {
  user?: {
    name?: string | null;
  },
  onSignIn: () => void,
  onSignOut: () => void,
}

export const Appbar = ({ user, onSignIn, onSignOut }: AppbarProps) => {
  return (
    <header
      className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <a aria-current="page" className="flex items-center" href="/">
              <img
                className="h-9 w-auto"
                src={dash.src}
                alt="svg"
              />
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <a aria-current="page"
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#">How it works</a>
            <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#">Pricing</a>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button onClick={user ? onSignOut : onSignIn}>{user ? "Logout" : "Login"}</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
