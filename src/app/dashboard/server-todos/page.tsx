export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getUserSessionServer } from "@/app/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
    title: 'Listado de TODOS',
    description: 'Listado de TODOS',
};

export default async function ServerTodoPage() {
    const user = await getUserSessionServer()
    if (!user) redirect('/api/auth/signin')
    const todos = await prisma.todo.findMany({ orderBy: { description: 'desc' }, where: { userId: user.id } })
    return (
        <>
            <span className="text-3xl mb-10">Server Action</span>
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            <TodosGrid todos={todos} />
        </>
    )
}
