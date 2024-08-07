import useAuth from '../../../hooks/use-auth';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    User
} from "@nextui-org/react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { getLocalTimeZone, now } from "@internationalized/date";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const DashboardNav = () => {
    const { auth } = useAuth();
    const currentTime = now(getLocalTimeZone())

    const date = {
        day: currentTime.day,
        month: monthNames[currentTime.month - 1],
        year: currentTime.year
    }

    const time = {
        hour: currentTime.hour,
        minute: currentTime.minute,
        second: currentTime.second
    }

    const user = auth.user;

    return (
        <Navbar shouldHideOnScroll>
            <NavbarContent className="hidden sm:flex gap-4" justify="start">
                <NavbarBrand className="flex items-center gap-4">
                    <span className="border rounded-full p-2 w-12 h-12 text-lg font-bold text-center">
                        {date.day}
                    </span>
                    <span>
                        <span className="block text-md font-bold">{date.month}</span>
                        <span className="block text-center text-sm font-bold">{date.year}</span>
                    </span>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="center">
                {/* greet user based on time of the day */}
                <NavbarItem>
                    <span className="text-lg font-bold">Good {time.hour < 12 ? "Morning" : time.hour < 18 ? "Afternoon" : "Evening"}, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}!!</span>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button auto className="text-blue-500 rounded-md bg-gray-100 border border-gray-200 space-x-2">
                        <IoMdAddCircleOutline size={24} />
                        Add New
                    </Button>
                </NavbarItem>
                <NavbarItem>
                <User   
                    name="Jane Doe"
                    description="Product Designer"
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                    }}
                />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default DashboardNav