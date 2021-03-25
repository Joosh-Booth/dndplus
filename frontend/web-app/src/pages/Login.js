import { LoginForm } from '@components/forms'
import { selectLogin } from '@components/slices/loginSlice'
import { useSelector } from 'react-redux'


//Return home button
const Login = () => {
  const loggedIn = useSelector(selectLogin)
  return (
    loggedIn ? "Youre already logged in" : <LoginForm />
  )
}

export default Login