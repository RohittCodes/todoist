import { Button } from '@nextui-org/button'
import Cookies from 'js-cookie'

const LogoutButton = () => {

    const logout = () => {
        // Remove token and user from cookies
        Cookies.remove('token')
        Cookies.remove('user')
        // refresh page to remove any stale data
        window.location.reload()
    }

  return (
    <Button color="error" onClick={logout}>
        Logout
    </Button>
  )
}

export default LogoutButton