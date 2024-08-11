import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppBar } from "../components/AppbarCompo";
import { BlogCard } from "../components/BlogCard";
import { BlogElement } from "../components/BlogElement";
import { useBlog } from "../hooks/bloghook";


export function Blogs() {
    const navigator = useNavigate();

    const { blogs, loading } = useBlog();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigator('/signup')
        }
    })

    return <div className="w-screen h-screen">
        <div className="w-screen">
            <AppBar />
        </div>

        <BlogElement blogs={blogs} loading={loading} />
    </div>
}