import { useBlogById } from "../hooks/bloghook";
import { Avtar } from "./Avtar";

export function FullBlog({ id }: { id: string }) {
    const { blog, loading } = useBlogById({ id: id });
    console.log(blog);

    if (loading === true) {
        return <div>
            loading....
        </div>
    }

    return <div className="flex flex-col items-center">
        <div className="w-[50%] flex">
            <div>
                <div className="text-5xl font-bold py-5">
                    {blog?.title}
                </div>
                <div className="flex items-center">
                    <Avtar name={blog?.User.username!} />
                    <div className="px-3">
                        <p >{blog?.User.username}</p>
                        <div className="flex">
                            <p className="text-slate-500">3 min read</p>
                            <div className="text-slate-400 px-2">
                                &#8226;
                            </div>
                            <p className="text-slate-500">Feb 2023 , 2024</p>
                        </div>
                    </div>
                </div>
                <div className="py-2">
                    {blog?.description}
                </div>
            </div>
        </div>
    </div>
}