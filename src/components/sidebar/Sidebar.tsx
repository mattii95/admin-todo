import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPerson, IoPersonOutline } from "react-icons/io5";
import { auth } from "@/auth";
import { LogoutButton } from "./LogoutButton";

type RouteItem = {
    title: string,
    href: string,
    icon: React.ReactNode
}

const routes: RouteItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: <IoCalendarOutline size={30} /> },
    { title: 'Rest TODO', href: '/dashboard/rest-todos', icon: <IoCheckboxOutline size={30} /> },
    { title: 'Server Actions', href: '/dashboard/server-todos', icon: <IoListOutline size={30} /> },
    { title: 'Cookies', href: '/dashboard/cookies', icon: <IoCodeWorkingOutline size={30} /> },
    { title: 'Productos', href: '/dashboard/products', icon: <IoBasketOutline size={30} /> },
    { title: 'Perfil', href: '/dashboard/profile', icon: <IoPersonOutline size={30} /> },
]

export default async function Sidebar() {
    const session = await auth()
    const userName = session?.user?.name ?? 'No Name'
    const avatar = session?.user?.image ? session?.user?.image : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'
    const userRoles = session?.user?.roles ?? ['client']
    return (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                <div className="-mx-6 px-6 py-4">
                    <Link href="/dashboard" title="home">
                        {/* <Image
                            src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
                            className="w-32"
                            alt="tailus logo"
                            width={75}
                            height={75}
                        /> */}
                        Dashboard
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    <Image
                        src={avatar}
                        alt=""
                        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                        width={150}
                        height={150}
                    />
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
                    <span className="hidden text-gray-400 lg:block capitalize">
                        {userRoles.join(', ')}
                    </span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
                    {
                        routes.map(item => (
                            <SidebarItem
                                key={item.title}
                                {...item}
                            />
                        ))
                    }
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <LogoutButton />
            </div>
        </aside>
    )
}