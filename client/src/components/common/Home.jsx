import {useContext, useEffect} from 'react'
import {UserAuthorContextObj} from '../../contexts/UserAuthorContext.jsx'
import {useUser} from '@clerk/react'

function Home() {
  const {currentUser,setCurrentUser}=useContext(UserAuthorContextObj)  

  const {isSignedIn,user,isLoaded}=useUser()

  console.log("isSignedIn:",isSignedIn)
  console.log("User:",user)
  console.log("isLoaded:",isLoaded)


  useEffect(()=>{
    setCurrentUser({
      ...currentUser,
      firstName:user?.firstName,
      lastName:user?.lastName,
      email:user?.emailAddresses[0].emailAddress,
      profileImageUrl:user?.imageUrl
    })
  },[isLoaded])
  return (
    <div className='container'>
      {
        isSignedIn===false&&<div>
          <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia facere voluptatem sint deserunt reprehenderit aperiam error provident. Cum reprehenderit aspernatur alias dolore laborum.</p>
          <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia facere voluptatem sint deserunt reprehenderit aperiam error provident. Cum reprehenderit aspernatur alias dolore laborum.</p>
          <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia facere voluptatem sint deserunt reprehenderit aperiam error provident. Cum reprehenderit aspernatur alias dolore laborum.</p>
        </div>
      }
      {
        isSignedIn===true&&<div className='d-flex justify-content-evenly align-items-center bg-info p-3'>
          <img src={user.imageUrl} width="100px" className='rounded-circle' alt="" />
          <p className="display-6">{user.firstName}</p>
        </div>
      }
    </div>
  )
}

export default Home;