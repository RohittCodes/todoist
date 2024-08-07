import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { Button } from '@nextui-org/button'
import { MdSpaceDashboard } from 'react-icons/md'
import { IoCheckmarkDoneCircle, IoSettings } from 'react-icons/io5'
import { RiProgress2Line } from 'react-icons/ri'
import LogoutButton from '../components/logout-button'

const Sidebar = () => {

    const pathname = window.location.pathname;

    const sidebarItems = [
        {
            title: "Dashboard",
            icon: <MdSpaceDashboard />,
            link: "/dashboard"
        },
        {
            title: "Completed",
            icon: <IoCheckmarkDoneCircle />,
            link: "/dashboard/completed"
        },
        {
            title: "In Progress",
            icon: <RiProgress2Line />,
            link: "/dashboard/in-progress"
        },
    ]

    return (
        <div className="h-full flex flex-col bg-white shadow-lg w-[18rem] justify-between px-4 py-6">
            <div className="w-full h-full space-y-4">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <img src={Logo} alt="Logo" className="w-8 h-8" />
                        <h1 className="text-3xl font-bold text-center text-blue-500">
                            Todoist
                        </h1>
                    </div>
                </Link>
                <div className="w-full h-full space-y-2">
                    {
                        sidebarItems.map((item, index) => (
                            <Link to={item.link} key={index} className={`flex items-center space-x-2 p-2 rounded-md ${pathname === item.link ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-blue-200 hover:text-gray-500'}`}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className="w-full flex flex-col space-y-2">
                <Link to="/dashboard/settings" className={`flex items-center space-x-2 p-2 rounded-md ${pathname === "/dashboard/settings" ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-500'}`}>
                    Settings
                    <IoSettings />
                </Link>
                <LogoutButton />
            </div>
        </div>
    )
}

export default Sidebar