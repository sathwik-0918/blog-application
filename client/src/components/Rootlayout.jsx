import React from 'react'
import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'
import UserAuthorContext from '../contexts/UserAuthorContext.jsx'


// import ur publishable key
const PUBLISHABLE_KEY=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!PUBLISHABLE_KEY){
  throw new Error("Missing Publishable Key")
}

function Rootlayout() {
  return (
    <UserAuthorContext>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <div>
      <Header />
        <div style={{minHeight:"90vh"}}>
          <Outlet />
        </div>
      <Footer />
    </div>
    </ClerkProvider>
    </UserAuthorContext>
  )
}

export default Rootlayout