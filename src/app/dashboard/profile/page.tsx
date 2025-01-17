'use client'
import { useSession } from 'next-auth/react'

export default function ProfilePage() {
    const { data: session } = useSession()
    return (
        <div>
            <h1>Page Profile</h1>
            <hr />
            <div className='flex flex-col'>
                <span>{session?.user?.name ?? 'no name'}</span>
                <span>{session?.user?.email ?? 'no email'}</span>
                <span>{session?.user?.image ?? 'no image'}</span>
                <span>{session?.user?.roles?.join(', ') ?? 'no role'}</span>
            </div>
        </div>
    )
}
