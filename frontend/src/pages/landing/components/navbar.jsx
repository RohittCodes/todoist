import Logo from '../../../assets/h-logo.svg'
import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/button'

const LandingNav = () => {
  return (
    <div className="h-20 w-full flex items-center justify-between px-4 py-4 shadow-sm sticky top-0 bg-white z-10">
        <Link to="/">
            <img src={Logo} alt="logo" className="h-8" />
        </Link>
        <div className="flex space-x-4">
            <Link to="#testimonials" className="text-gray-600 hover:text-gray-800 transition-colors duration-300 font-semibold">
                Testimonials
            </Link>
            <Link to="#about" className="text-gray-600 hover:text-gray-800 transition-colors duration-300 font-semibold">
                About
            </Link>
            <Link to="#contact" className="text-gray-600 hover:text-gray-800 transition-colors duration-300 font-semibold">
                Contact
            </Link>
        </div>
        <div className="flex space-x-4">
            <Link to="/login">
                <Button color="primary">Login</Button>
            </Link>
            <Link to="/register">
                <Button color="primary">Register</Button>
            </Link>
        </div>
    </div>
  )
}

export default LandingNav