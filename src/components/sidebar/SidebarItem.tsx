"use client"
import { usePathname } from "next/navigation"

type SidebarItemProps = {
    title: string,
    icon: React.ReactNode
    href: string
}

export default function SidebarItem({ title, icon, href }: SidebarItemProps) {
    const pathname = usePathname()
    return (
        <li>
            <a href={href}
                className={`
                    relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
                    hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400 hover:text-white
                    ${href === pathname ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}
                `}
            >
                {icon}
                <span className="-mr-1 font-medium">{title}</span>
            </a>
        </li>
    )
}
