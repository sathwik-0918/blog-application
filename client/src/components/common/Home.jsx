import {useContext} from 'react'
import {userAuthorContextObj} from '../../contexts/userAuthorContext.jsx'
import {useUser} from '@clerk/react'

function Home() {
  const data=useContext(userAuthorContextObj)
  console.log("data :",data)
  const {isSignedIn,user,isLoaded}=useUser()

  console.log("isSignedIn:",isSignedIn)
  console.log("User:",user)
  console.log("isLoaded:",isLoaded)
  return (
    <div>Home</div>
  )
}

export default Home;