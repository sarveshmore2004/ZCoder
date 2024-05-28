import { UserProfile } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Profile() {
  return (
    <>
     {/* <UserProfile /> */}
      <Link to="/">Return to index</Link>
      <p>nothing here</p>
    </>
  )
}

export default Profile