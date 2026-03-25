import {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./Header.css"
import { UserAuthorContextObj } from '../../contexts/UserAuthorContext'
import { useClerk,useUser } from '@clerk/react'

function Header() {
  const {signOut}=useClerk()
  const {isSignedIn,user,isLoaded}=useUser();
  const {currentUser,setCurrentUser}=useContext(UserAuthorContextObj)
  const navigate=useNavigate();


    // function to signout
    async function handleSignout() {
      await signOut();
      setCurrentUser(null);
      navigate('/')
      
    }

  return (
    <div>
      <nav className='header d-flex justify-content-between'>
        <div className="d-flex justify-content-center">
          <Link to='/'>
            LOGO
          </Link>
        </div>
        <ul className="d-flex justify-content-around list-unstyled header-links">
          {
            !isSignedIn?
            <>
              <li>
                <Link to=''>Home</Link>
              </li>
              <li>
                <Link to='signin'>Signin</Link>
              </li>
              <li>
                <Link to='signup'>Signup</Link>
              </li>
            </>:
            <div className='user-button'>
              <div style={{position:'relative'}}>
                <img src={user.imageUrl} width='40px' className='rounded-circle' alt='' />
                <p className='role' >{user.firstName}</p>
                <button className='btn btn-danger signout-btn' onClick={handleSignout}>Signout</button>
              </div>
            </div>
          }
          
        </ul>
      </nav>
    </div>
  )
}

export default Header