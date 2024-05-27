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
          <div>
            <SignedOut>
              <Link to='sign-in'>Sign In</Link>
              <Link to='sign-up'>Sign Up</Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}