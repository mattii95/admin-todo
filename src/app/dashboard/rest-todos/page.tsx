import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
    title: 'Listado de TODOS',
    description: 'Listado de TODOS',
};

export default async function RestTodoPage() {
    const todos = await prisma.todo.findMany({ orderBy: { description: 'desc' } })
    return (
        <>
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            <TodosGrid todos={todos} />
        </>
    )
}
