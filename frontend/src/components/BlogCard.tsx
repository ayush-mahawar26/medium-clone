import { Link } from "react-router-dom"

export type BlogType = {
    id: string,
    title: string,
    description: string,
    published: boolean,
    User: {
        username: string
    }
}

export function BlogCard({ blog }: { blog: BlogType }) {
    return <div className="border-b-2 w-[50%] pt-3 hover:cursor-pointer px-4">
        <Link to={`/blogs/${blog.id}`}>
            <div className="flex items-center">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{blog.User.username[0]}</span>
                </div>
                <div className="text-sm px-2 text-slate-400">
                    {blog.User.username}
                </div>
                <div className="text-slate-400 pr-2">
                    &#8226;
                </div>
                <div className="text-sm text-slate-400 font-light">
                    2nd Feb 2024
                </div>
            </div>
            <div>
                <div className="text-2xl font-bold">
                    {blog.title}
                </div>
                <div className="text-base text-slate-400">
                    {blog.description}
                </div>
            </div>
            <div className="text-base text-slate-400 py-3">
                1 minute(s) read
            </div>
        </Link>
    </div>
}