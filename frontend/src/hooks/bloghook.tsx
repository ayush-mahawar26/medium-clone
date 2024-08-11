import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { BlogType } from "../components/BlogCard"


export const useBlog = () => {
    const [blogs, setBlog] = useState<BlogType[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const url = `${BACKEND_URL}/api/v1/blog`

        axios.get(
            url,
            {
                headers: {
                    'Content-Type': 'application/json', // Ensure this matches what you use in Postman
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // If you use authentication
                },
            }
        ).then((res) => {
            const blogs = res.data.data;
            console.log(blogs);
            setBlog(blogs)
            setLoading(false);
        })
    }, [])

    return {
        blogs,
        loading
    }
}

export const useBlogById = ({ id }: { id: string }) => {
    const [blog, setBlog] = useState<BlogType>()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const url = `${BACKEND_URL}/api/v1/blog/${id}`

        axios.get(
            url,
            {
                headers: {
                    'Content-Type': 'application/json', // Ensure this matches what you use in Postman
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // If you use authentication
                },
            }
        ).then((res) => {
            const blogs = res.data.data.post;
            console.log(blogs);

            setBlog(blogs)
            setLoading(false);
        })
    }, [id])

    return {
        blog,
        loading
    }
}