import { SignInButton } from '@clerk/clerk-react'
import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInButton forceRedirectUrl='/dashboard' />
    </div>
  )
}

export default Home