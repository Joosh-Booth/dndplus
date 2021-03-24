import Client from './Client'
import Server from './Server'
import SSRLimiter from '@components/SSRLimiter'

const NavBar = () => {

  return (
    <SSRLimiter client={<Client/>} server={<Server/>}/>
  )
  
}


export default NavBar