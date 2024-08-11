import { BlogCard, BlogType } from "./BlogCard"
import { useBlog } from "../hooks/bloghook"
import { ShimmerEffectBlog } from "./Shimmer";

export function BlogElement({ blogs, loading }: { blogs: BlogType[], loading: boolean }) {



    if (loading == true) {
        return <div className="flex flex-col items-center pt-1">
            <ShimmerEffectBlog />
            <ShimmerEffectBlog />
            <ShimmerEffectBlog />
            <ShimmerEffectBlog />
            <ShimmerEffectBlog />
        </div>
    }


    return <div className="flex flex-col items-center pt-1">
        {blogs.map((blog) => {
            return <BlogCard key={blog.id} blog={blog} />
        })}
    </div>
}