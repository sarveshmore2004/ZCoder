import { Link, Outlet, useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

export default function RootLayout() {

  return (
    <div>
      <header className="header">
        <div>
          <div>
            <p>ZCoder</p>
          </div>
          <SignedIn>
            <UserButton afterSignOutUrl='/sign-in' />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">Sign In</Link>
          </SignedOut>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}